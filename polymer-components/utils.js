class utils
{
	//Needs to be used in the Polymer constructor or you'll get errors
	static forklift(context, list)
	{
		list.forEach(key => {
			if(utils[key])
			{
				context.set("_utils_"+key, utils[key]);
			}
			else
			{
				console.error("Utils Function Does Not Exist", key);
			}
		});
	}

	//Todo: Account for deletes? Add in detail view changes as well?
	static handleChanges(change, context, contextVariable)
	{
		//Rev 1-Whatever = New Document
		if(change.doc._rev[0] === "1" && change.doc._rev[1] === "-")
		{
			context.push(contextVariable, change.doc);
		}

		context.get(contextVariable).forEach((row, index) => {
			if(change.doc._id === row._id)
			{
				if(change.deleted)
				{
					context.splice(contextVariable, index, 1);
				}
				else
				{
					context.set(contextVariable+"."+index, change.doc);
				}
			}
		});
	}

	static isAdmin(roles, companyID)
	{
		if(roles.indexOf(companyID+"-admins") !== -1)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	static isAdminTemplate()
	{
		//Helpfully, between the fun of forklifting and polymer in general, templating passes through this.
		return utils.isAdmin(this.$.meta.byKey("roles"), this.$.meta.byKey("companiesInfo")[this.focusedCompany].companyID);
	}

	static breadcrumbNavigate(event, detail)
	{
		if(detail.function)
		{
			this[detail.function]();
		}
	}

	static invalidPropertiesCleanup(invalidProperties)
	{
		Object.keys(invalidProperties).forEach((key) => {
			if(Array.isArray(invalidProperties[key]) && invalidProperties[key].length === 0)
			{
				delete invalidProperties[key];
			}
			else if(typeof invalidProperties[key] === "object")
			{
				if(Object.keys(invalidProperties[key]).length > 0)
				{
					utils.invalidPropertiesCleanup(invalidProperties[key]);
				}
				if(Object.keys(invalidProperties[key]).length === 0)
				{
					delete invalidProperties[key];
				}
			}
		});
	}

	static fixedCheck(object, compareObject, subkey, invalidProperties)
	{
		if(compareObject)
		{
			Object.keys(object.properties ? object.properties : object).forEach((key) => {
				if(Array.isArray(object[key]))
				{
					//TODO: Account for arrays that are data only, same length
					if(object[key].length !== compareObject[key].length)
					{
						if(object.properties[key][subkey])
						{
							invalidProperties[key] = true;
						}
					}
					utils.fixedCheck(object[key], compareObject[key], subkey, invalidProperties[key]);
				}
				else if(typeof object[key] === "object")
				{
					if(object[key] !== null && Object.keys(object[key]).length !== 0)
					{
						if(!compareObject[key])
						{
							if(object.properties[key][subkey])
							{
								invalidProperties[key] = true;
							}
						}
						else if (Object.keys(object[key]).length !== Object.keys(compareObject[key]).length)
						{
							if(object.properties[key][subkey])
							{
								invalidProperties[key] = true;
							}
						}
						utils.fixedCheck(object[key], compareObject[key], subkey, invalidProperties[key]);
					}
					else
					{
						if(compareObject[key] == undefined || Object.keys(compareObject[key]).length !== 0)
						{
							if(object.properties[key][subkey])
							{
								invalidProperties[key] = true;
							}
						}
					}
				}
				else
				{
					if(object[key] !== compareObject[key])
					{
						if(object.properties[key][subkey])
						{
							invalidProperties[key] = true;
						}
					}
				}
			});
		}
		else
		{
			return {error: true, detail: "No Data To Compare Against"};
		}
	}

	static dirtyCheck(object, dirtyProperties, dirtyArray, verbose, objectChain)
	{
		if(objectChain === undefined)
		{
			objectChain = [];
		}

		if(dirtyArray.diff === undefined)
		{
			dirtyArray.diff = [];
		}

		if(dirtyProperties)
		{
			//If a model, only check things that exist in the model
			Object.keys(object.properties ? object.properties : object).forEach((key) => {
				if(Array.isArray(object[key]))
				{
					if(!Array.isArray(dirtyProperties[key]) || object[key].length !== dirtyProperties[key].length)
					{
						dirtyArray.dirty = true;
						dirtyArray.array.push(key);
						dirtyArray.diff.push( {key: key, value: object[key], originalValue: dirtyProperties[key], chain: JSON.parse(JSON.stringify(objectChain))} );
					}
					objectChain.push(key);
					utils.dirtyCheck(object[key], dirtyProperties[key], dirtyArray, verbose, objectChain);
				}
				else if(typeof object[key] === "object")
				{
					//Null being an object is kind of annoying, but null not being able to be converted to an object is... javascript.
					if(object[key] !== null && Object.keys(object[key]).length !== 0)
					{
						if(!dirtyProperties[key])
						{
							dirtyArray.dirty = true;
							dirtyArray.array.push(key);
							dirtyArray.diff.push( {key: key, value: object[key], originalValue: dirtyProperties[key], chain: JSON.parse(JSON.stringify(objectChain))} );
						}
						else if (Object.keys(object[key]).length !== Object.keys(dirtyProperties[key]).length)
						{
							dirtyArray.dirty = true;
							dirtyArray.array.push(key);
							dirtyArray.diff.push( {key: key, value: object[key], originalValue: dirtyProperties[key], chain: JSON.parse(JSON.stringify(objectChain))} );
						}
						objectChain.push(key);
						utils.dirtyCheck(object[key], dirtyProperties[key], dirtyArray, verbose, objectChain);
					}
					else
					{
						if(dirtyProperties[key] == undefined || Object.keys(dirtyProperties[key]).length !== 0)
						{
							dirtyArray.dirty = true;
							dirtyArray.array.push(key);
							dirtyArray.diff.push( {key: key, value: object[key], originalValue: dirtyProperties[key], chain: JSON.parse(JSON.stringify(objectChain))} );
						}
					}
				}
				else
				{
					if(object[key] !== dirtyProperties[key])
					{
						dirtyArray.dirty = true;
						dirtyArray.array.push(key);
						dirtyArray.diff.push( {key: key, value: object[key], originalValue: dirtyProperties[key], chain: JSON.parse(JSON.stringify(objectChain))} );
					}
				}
			});

			objectChain.pop();
		}
		else
		{
			//For Super exhaustive dirty check popup list.
			if(verbose === true)
			{	
				Object.keys(object.properties ? object.properties : object).forEach((key) => {
					if(Array.isArray(object[key]))
					{
						objectChain.push(key);
						utils.dirtyCheck(object[key], undefined, dirtyArray, verbose, objectChain);
					}
					else if(typeof object[key] === "object")
					{
						//Null being an object is kind of annoying, but null not being able to be converted to an object is... javascript.
						if(object[key] !== null && Object.keys(object[key]).length !== 0)
						{
							dirtyArray.dirty = true;
							dirtyArray.array.push(key);
							dirtyArray.diff.push( {key: key, value: object[key], originalValue: undefined, chain: JSON.parse(JSON.stringify(objectChain))} );
							
							objectChain.push(key);
							utils.dirtyCheck(object[key], undefined, dirtyArray, verbose, objectChain);
						}
						else
						{
							dirtyArray.dirty = true;
							dirtyArray.array.push(key);
							dirtyArray.diff.push( {key: key, value: object[key], originalValue: undefined, chain: JSON.parse(JSON.stringify(objectChain))} );
						}
					}
					else
					{
						if(object[key])
						{
							dirtyArray.dirty = true;
							dirtyArray.array.push(key);
							dirtyArray.diff.push( {key: key, value: object[key], originalValue: undefined, chain: JSON.parse(JSON.stringify(objectChain))} );
						}
					}
				});
			}

			objectChain.pop();
			//Either this is the base level object, in which case, return will error, or it doesn't matter what you return
			return {error: true, detail: "Model not initialized with dirtyConstructor"};
		}
	}

	static dirtyCheckPopup(popup, data, saveCallback, actionCallback, event)
	{
		let dirtyData = {dirty: false, array: [], diff: []};
		utils.dirtyCheck(data, data._dirtyProperties, dirtyData);
		if (dirtyData.dirty === true)
		{
			if (event instanceof Event)
			{
				// Always stop the propagation of the event, if specified, when dirty in order to make dirty interrupts actually work.
				event.stopPropagation();
			}
			popup.set("callback", true);
			//popup.set("confirmCallbackContext", saveCallbackContext);
			popup.set("confirmCallback", saveCallback);
			//popup.set("cancelCallbackContext", actionCallbackContext);
			popup.set("cancelCallback", actionCallback);
			popup.set("closeable", true);
			popup.set("positiveButtonText", "Save");
			popup.set("negativeButtonText", "Don't Save");
			popup.set("dirtyDiff", dirtyData.diff);
			popup.open();
		}
		else
		{
			actionCallback();
		}
	}

	//TODO: Ultimately, we probably will want to phase-out the passing of contexts in favor of explicitly binding callbacks to the contexts we expect them to run within.
	static dirtyCheckPopupWithContext(popup, data, saveCallbackContext, saveCallback, actionCallbackContext, actionCallback, event)
	{
		let boundSaveCallback = function() {
			saveCallback.bind(saveCallbackContext)(saveCallbackContext);
		};

		let boundActionCallback = function() {
			actionCallback.bind(actionCallbackContext)(actionCallbackContext);
		};

		utils.dirtyCheckPopup(popup, data, boundSaveCallback, boundActionCallback, event);
	}

	//TODO: Phase out this static function in favor of the static "get" accessor function immediately following it.
	static emailRegex()
	{
		return utils.emailRegEx;
	}

	static get emailRegEx()
	{
		return /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z]{2,10})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
	}

	static get alphaNumericRegEx()
	{
		//^ = Start of string, +$ = until end of string
		return /^[0-9a-zA-Z]+$/;
	}

	static get nameRegex()
	{
		//^ = Start of String, + = as many characters as possible, $ = end of string
		return /^[0-9a-zA-Z][.0-9a-zA-Z ]+[.0-9a-zA-Z]$/
	}

	static get currencyDropdownData()
	{
		return [
			{label: "USD (US Dollar)", value: "USD"},
			{label: "CAD (Canadian Dollar)", value: "CAD", hr: true},
			{label: "AUD (Australian Dollar)", value: "AUD"},
			{label: "BRL (Brazilian Real)", value: "BRL"},
			{label: "CHF (Swiss Franc)", value: "CHF"},
			{label: "CNY (Renminbi)", value: "CNY"},
			{label: "EUR (Euro)", value: "EUR"},
			{label: "GBP (Pound Sterling)", value: "GBP"},
			{label: "HKD (Hong Kong Dollar)", value: "HKD"},
			{label: "INR (Indian Rupee)", value: "INR"},
			{label: "JPY (Japanese Yen)", value: "JPY"},
			{label: "KRW (South Korean Won)", value: "KRW"},
			{label: "MXN (Mexican Peso)", value: "MXN"},
			{label: "NOK (Norwegian Krone)", value: "NOK"},
			{label: "NZD (New Zealand Dollar)", value: "NZD"},
			{label: "RUB (Russian Ruble)", value: "RUB"},
			{label: "SEK (Swedish Krona)", value: "SEK"},
			{label: "SGD (Singapore Dollar)", value: "SGD"},
			{label: "TRY (Turkish Lira)", value: "TRY"},
			{label: "ZAR (South African Rand)", value: "ZAR"}
		];
	}

	static get defaultDate()
	{
		return moment("1900/01/01", "YYYY/MM/DD").valueOf();
	}

	static getReadableTimestamp(timestamp, timezone = 'Canada/Pacific', stringFormat = "MMMM Do, YYYY, h:mm:ss a")
	{
		return moment.tz(timestamp, timezone).format(stringFormat);
	}

	//-- Errors --//

	//Used for displaying information that doesn't need a console entry (e.g. changes feed updates)
	static alert(type, message, dismissTimer)
	{
		//Dismiss time (seconds) of 0 is there until clicked
		var dismissTime = 0;
		if(dismissTimer)
		{
			dismissTime = dismissTimer;
		}

		if(typeof type === "string" && type.toLowerCase() === "positive")
		{
			alertify.notify(message, 'success', dismissTime);
		}
		else if(typeof type === "string" &&  type.toLowerCase() === "negative")
		{
			alertify.notify(message, 'error', dismissTime);
		}
		else if(typeof type === "string" && type.toLowerCase() === "neutral")
		{
			alertify.notify(message, 'message', dismissTime);
		}
		else if(typeof type === "string" && type.toLowerCase() === "permament")
		{
			alertify.notify(message, 'error', 0, function() {
				utils.alert(type, message, dismissTimer);
			});
		}
		else
		{
			alertify.notify(message, 'warning', dismissTime);
		}
	}

	static error(context, message)
	{
		//Message should be formatted as {code: , detail: }
		if(context.errorFeed)
		{
			context.push("errorFeed", message);
			context.notifyPath("errorFeed");
		}
		utils.alert("negative", message.code + " - " + message.detail);
		console.error(message.code, message.detail);
	}

	//Used to prevent action, and if persistent, prevent action on refresh until code is entered.
	static blockingError(context, message, persist)
	{
		utils.error(context, message);
		context.dispatchEvent(new CustomEvent('block', {detail: {message: message, persist: persist}, bubbles: true, composed: true}));

	}

	static get validMimeTypes()
	{
		return ['image/bmp',
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
			'image/gif',
			'image/jpeg',
			'image/x-citrix-jpeg',
			'application/vnd.oasis.opendocument.presentation',
			'application/vnd.oasis.opendocument.spreadsheet',
			'application/vnd.oasis.opendocument.text',
			'application/pdf',
			'image/png',
			'image/x-citrix-png',
			'image/x-png',
			'application/vnd.openxmlformats-officedocument.presentationml.presentation',
			'application/rtf',
			'text/richtext',
			'image/tiff',
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
		];
	}

	static get readableMimeTypeMap()
	{
		return {
			'image/bmp': "Bitmap Image",
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document': "Microsoft Word Document",
			'image/gif': "Image (GIF)",
			'image/jpeg': "Image (JPEG)",
			'image/x-citrix-jpeg': "Image (JPEG)",
			'application/vnd.oasis.opendocument.presentation': "Open Office Presentation",
			'application/vnd.oasis.opendocument.spreadsheet': "Open Office Spreadsheet",
			'application/vnd.oasis.opendocument.text': "Open Office Document",
			'application/pdf': "Adobe PDF",
			'image/png': "Image (PNG)",
			'image/x-citrix-png': "Image (PNG)",
			'image/x-png': "Image (PNG)",
			'application/vnd.openxmlformats-officedocument.presentationml.presentation': "Microsoft PowerPoint Presentation",
			'application/rtf': "Rich Text Document",
			'text/richtext': "Rich Text Document",
			'image/tiff': "Image (TIFF)",
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': "Open Office Spreadsheet"
		};
	}

	static validNumber(number)
	{
		// The name "isValidNumber" is more consistent with existing utils functions in other projects, but
		// this alias must still exist since a bunch of code is currently referencing it.
		return utils.isValidNumber(number);
	}

	static isEmptyObject(value)
	{
		return (utils.isObject(value) && Object.keys(value).length === 0);
	}

	static isNonEmptyObject(value)
	{
		return (utils.isObject(value) && Object.keys(value).length > 0);
	}

	static isNonEmptyString(value)
	{
		return (typeof(value) === 'string' && value.trim() !== "");
	}

	static isObject(value)
	{
		return (typeof(value) === 'object' && !Array.isArray(value) && value != null);
	}

	static isValidCurrency(value)
	{
		let data = utils.currencyDropdownData;
		for (let i in data)
		{
			if (data[i].value === value)
			{
				return true;
			}
		}
		return false;
	}

	static isValidNumber(value)
	{
		// Return whether value IS a number (excluding +/- Infinity and NaN), IS NOT equal to -0, and IS NOT in exponential notation.
		return (Number.isFinite(value) && !Object.is(value, -0) && !(/e/i).test(value));
	}

	static parseFloat(value)
	{
		try
		{
			// It's worth noting that due to how numeral works,
			// if the given number here has more than eight decimal places,
			// it will be rounded to the nearest eight decimal places, not truncated.
			var number = numeral(numeral(value).format("0[.]00000000")).value();
			if (utils.isValidNumber(number))
			{
				return number;
			}
			else
			{
				throw null;
			}
		}
		catch (err)
		{
			return 0;
		}
	}

	static parseInt(value)
	{
		try
		{
			// It's worth noting that due to how numeral works,
			// if the given number here has any decimal places,
			// it will be rounded to the nearest whole number, not truncated.
			var number = numeral(numeral(value).format("0")).value();
			if (utils.isValidNumber(number))
			{
				return number;
			}
			else
			{
				throw null;
			}
		}
		catch (err)
		{
			return 0;
		}
	}

	static get urlRegEx()
	{
		return /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
	}

	static get domainRegEx()
	{
		return /^(((?!-))(xn--)?[a-z0-9-_]{0,61}[a-z0-9]{1,1}\.)*(xn--)?([a-z0-9\-]{1,61}|[a-z0-9-]{1,30}\.[a-z]{2,})$/i;
	}

	//-- Generic Constructors --//

	static dirtyConstructor(object, data)
	{
		if(!data)
		{
			object._dirtyProperties = {};
			Object.keys(object.properties).forEach((key) => {
				if(typeof object.properties[key].value === "function")
				{
					object[key] = object.properties[key].value();
					object._dirtyProperties[key] = object.properties[key].value();
				}
				else
				{
					object[key] = object.properties[key].value;
					object._dirtyProperties[key] = object.properties[key].value;
				}
			});
		}
		else
		{
			var unlinkedData = JSON.parse(JSON.stringify(data));
			object._dirtyProperties = {};
			Object.keys(object.properties).forEach((key) => {
				if(typeof object.properties[key].value === "function")
				{
					object[key] = object.properties[key].value(unlinkedData[key]);
					object._dirtyProperties[key] = object.properties[key].value(unlinkedData[key]);
				}
				else
				{
					if(unlinkedData[key] === undefined)
					{
						object[key] = object.properties[key].value;
						object._dirtyProperties[key] = object.properties[key].value;
					}
					else
					{
						object[key] = unlinkedData[key];
						object._dirtyProperties[key] = unlinkedData[key];
					}
				}
			});
		}
	}

	static invalidConstructor(object, data, recurse)
	{
		if(!object._invalidProperties && !recurse)
		{
			object._invalidProperties = {};
		}

		if(!recurse)
		{
			Object.keys(data).forEach( key => {

				if(key === "_dirtyProperties" || key === "_invalidProperties")
				{
					return;
				}
				else if(Array.isArray(data[key]))
				{
					object._invalidProperties[key] = [];
					data[key].forEach( (arrayKey, index) => {
						if(typeof arrayKey === "object" && arrayKey !== null)
						{
							if (Object.keys(arrayKey).length > 0)
							{
								object._invalidProperties[key][index] = {};
							}
							else
							{
								object._invalidProperties[key][index] = true;
							}
							utils.invalidConstructor(object, arrayKey, object._invalidProperties[key][index]);
						}
						else
						{
							object._invalidProperties[key] = true;
							return;
						}
					});
				}
				else if(typeof data[key] === "object" && data[key] !== null)
				{
					if (Object.keys(data[key]).length > 0)
					{
						object._invalidProperties[key] = {};
						utils.invalidConstructor(object, data[key], object._invalidProperties[key]);
					}
					else
					{
						object._invalidProperties[key] = true;
					}
				}
				else
				{
					object._invalidProperties[key] = true;
				}
			});
		}
		else
		{
			Object.keys(data).forEach( key => {

				if(key === "_dirtyProperties" || key === "_invalidProperties")
				{
					return;
				}
				else if(Array.isArray(data[key]))
				{
					recurse[key] = [];
					data[key].forEach( (arrayKey, index) => {
						if(typeof arrayKey === "object" && arrayKey !== null)
						{
							if (Object.keys(arrayKey).length > 0)
							{
								recurse[key][index] = {};
							}
							else
							{
								recurse[key][index] = true;
							}
							utils.invalidConstructor(object, arrayKey, recurse[key][index]);
						}
						else
						{
							recurse[key] = true;
							return;
						}
					});
				}
				else if(typeof data[key] === "object" && data[key] !== null)
				{
					if (Object.keys(data[key]).length > 0)
					{
						recurse[key] = {};
						utils.invalidConstructor(object, data[key], recurse[key]);
					}
					else
					{
						recurse[key] = true;
					}
				}
				else
				{
					recurse[key] = true;
				}
			});
		}
	}

	static commonConstructor(object, data)
	{
		if(!data)
		{
			Object.keys(object.properties).forEach((key) => {
				if(typeof object.properties[key].value === 'function')
				{
					object[key] = object.properties[key].value();
				}
				else
				{
					object[key] = object.properties[key].value;
				}
			});
		}
		else
		{
			var unlinkedData = JSON.parse(JSON.stringify(data));
			Object.keys(object.properties).forEach((key) => {
				if(typeof object.properties[key].value === "function")
				{
					object[key] = object.properties[key].value(unlinkedData[key]);
				}
				else
				{
					if(unlinkedData[key] === undefined)
					{
						object[key] = object.properties[key].value;
					}
					else
					{
						object[key] = unlinkedData[key];
					}
				}
			});
		}
	}

	//-- Templating Operations--//

	//Needed because we can't do logical operations inside bindings
	static modulo(index)
	{
		return index%2;
	}

	static applyListClass(fixedClasses, index)
	{
		if(index%2)
		{
			return fixedClasses + " alternate-row"
		}
		return fixedClasses;
	}

	static prevNextCheck(value, compareValue)
	{
		if(typeof value === "string" && typeof compareValue === "string")
		{
			if(value === "both" || compareValue === "both")
			{
				return true;
			}
			else if(value === compareValue)
			{
				return true;
			}
			else
			{
				return false;
			}
		}
		else
		{
			return false;
		}
	}

	static compareCheck(value, compareValue)
	{
		if(typeof value === "string" && typeof compareValue === "string" && value && compareValue && compareValue.toLowerCase() === value.toLowerCase())
		{
			return true;
		}
		//Do we care about NaN === NaN?
		else if(typeof value === "number" && typeof compareValue === "number" && value === compareValue)
		{
			return true;
		}
		else if(typeof value === "function" && typeof compareValue === "function" && value === compareValue)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	static stringContains(compareString, contains)
	{
		if(typeof compareString === "string" && compareString.indexOf(contains) !== -1)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	static arrayContains(array, contains)
	{
		return (array.indexOf(contains) > -1);
	}

	static typeCheck(value, type)
	{
		if(typeof value === type)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	static greaterCheck(value, min)
	{
		if(value > min)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	static lesserCheck(value, max)
	{
		if(value < max)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	//Todo: type/value checking
	static rangeCheck(value, min, max)
	{
		if(value > min && value < max)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	static deCamelCase(string)
	{
		//Regex Magic, Sticks Space Before Capital Letters, Upper Cases The First Letter
		return string.replace(/([A-Z])/g, function(match) {
					return " " + match;
				}).replace(/^./, function(match) {
					return match.toUpperCase();
				});
	}

	//Used when you need to repeat through an object with keys, as opposed to an array
	static toArray(obj) {

		if(obj === null || obj === undefined)
		{
			console.error("Invalid data passed into toArray");
			return [];
		}

		return Object.keys(obj).map(function(key) {
			return {
				key: key,
				value: obj[key]
			};
		});
	}

	//I'm so thrilled that javascript has forced me to write this
	static toBoolean(string)
	{
		if(string === "true")
		{
			return true;
		}
		else if(string === "false")
		{
			return false;
		}
	}

	//- Variable Accessors-//
	static getSearchString(context)
	{
		if(context.searchString)
		{
			return context.searchString;
		}
		else
		{
			return "";
		}
	}

	//-- Filter Functions --//

	//Search a variable/array of variables(passed by key) to see if any match the searchValue
	static keyFilter(type, viewContext, repeaterContext, data, filterIndex, orIndex)
	{
		var searchKey;
		var searchValue;
		//Stupid Javascript, Don't depend on ! with numbers
		if(orIndex !== undefined)
		{
			searchKey = repeaterContext.filterOptions[filterIndex][orIndex].key;
			searchValue = repeaterContext.filterOptions[filterIndex][orIndex].value;
		}
		else
		{
			searchKey = repeaterContext.filterOptions[filterIndex].key;
			searchValue = repeaterContext.filterOptions[filterIndex].value;
		}

		if(searchKey === undefined || searchValue === undefined)
		{
			console.error("Filter Error: Invalid Comparitor", searchKey, searchValue, viewContext.filterOptions, repeaterContext.filterOptions);
			return false;
		}
		else if(!data || repeaterContext.get([searchKey], data) === undefined)
		{
			console.error("Filter Error: Missing/Invalid Data -", searchKey, repeaterContext.get([searchKey], data), data, viewContext.filterOptions, repeaterContext.filterOptions);
			return false;
		}

		//Basic Searchbar functionality
		if(type === "search")
		{
			if(typeof searchValue === "function")
			{
				//Add in a thing to allow a direct match directly on the record id without a transform
				if(viewContext.filterOptions && viewContext.filterOptions[filterIndex][orIndex].key === "_id")
				{
					if(repeaterContext.get([searchKey], data).toString().trim().toLowerCase() === searchValue(viewContext).toString().trim().toLowerCase())
					{
						return true;
					}
					else
					{
						return false;
					}
				}
				//Search on transformed data
				let transform = false;
				if(viewContext.columnList)
				{
					for(let i = 0; i < viewContext.columnList.length; i++)
					{
						if(viewContext.columnList[i].transformFunction !== undefined && viewContext.columnList[i].key === viewContext.filterOptions[filterIndex][orIndex].key)
						{
							transform = true;
							if(viewContext.columnList[i].transformFunction(repeaterContext.get([searchKey], data)).toString().trim().toLowerCase().indexOf(searchValue(viewContext).toString().trim().toLowerCase()) !== -1 )
							{
								return true;
							}
							else if(repeaterContext.get([searchKey], data).toString().trim().toLowerCase() === searchValue(viewContext).toString().trim().toLowerCase())
							{
								return true;
							}
						}
					}
				}

				//Search on non-transformed data
				if(transform === false && repeaterContext.get([searchKey], data).toString().trim().toLowerCase().indexOf(searchValue(viewContext).toString().trim().toLowerCase()) !== -1)
				{
					return true;
				}
			}
			else
			{
				//Pretty sure this never actually gets called
				if(repeaterContext.get([searchKey], data).toString().trim().toLowerCase().indexOf(searchValue.toString().trim().toLowerCase()) !== -1)
				{
					return true;
				}
			}
			return false;
		}
		//For when you need an exact comparison, to avoid the incomplete docs, complete docs indexOf problem
		else if(type === "equals" || type === "equalsDate")
		{
			if(typeof searchValue === "function")
			{
				if(repeaterContext.get([searchKey], data).toString().trim().toLowerCase() === searchValue(viewContext).toString().trim().toLowerCase() )
				{
					return true;
				}
			}
			else
			{
				if(repeaterContext.get([searchKey], data).toString().trim().toLowerCase() === searchValue.toString().trim().toLowerCase() )
				{
					return true;
				}
			}
		}
		else if(type === "greater" || type === "greaterEquals" || type === "lessEquals" || type === "less" || type === "greaterDate" || type === "greaterEqualsDate" || type === "lessEqualsDate" || type === "lessDate")
		{
			var compareValue;
			var dataValue;
			if(typeof searchValue === "function")
			{
				if( isFinite(numeral(repeaterContext.get([searchKey], data)).value() ) && isFinite(numeral(searchValue(viewContext)).value() ) )
				{
					compareValue = numeral(searchValue(viewContext)).value();
					dataValue = numeral(repeaterContext.get([searchKey], data)).value();
				}
				else
				{
					compareValue = searchValue(viewContext);
					dataValue = repeaterContext.get([searchKey], data);
				}
			}
			else
			{
				if( isFinite(numeral(repeaterContext.get([searchKey], data)).value() ) && isFinite(numeral(searchValue).value() ) )
				{
					compareValue = numeral(searchValue).value();
					dataValue = numeral(repeaterContext.get([searchKey], data)).value();
				}
				else
				{
					compareValue = searchValue;
					dataValue = repeaterContext.get([searchKey], data);
				}
			}

			if((type === "greater" || type === "greaterDate") && dataValue > compareValue)
			{
				return true;
			}
			else if((type === "greaterEquals" || type === "greaterEqualsDate") && dataValue >= compareValue)
			{
				return true;
			}
			else if((type === "lessEquals" || type === "lessEqualsDate") && dataValue <= compareValue)
			{
				return true;
			}
			else if((type === "less" || type === "lessDate") && dataValue < compareValue)
			{
				return true;
			}
		}
	}

	//Search An Array of Objects for a specific key, return all results for that key
	static arrayFilter(type, viewContext, repeaterContext, data, filterIndex, orIndex)
	{
		var searchArray;
		var searchKey;
		var searchValue;

		if(orIndex !== undefined)
		{
			searchArray = repeaterContext.filterOptions[filterIndex][orIndex].array;
			searchKey = repeaterContext.filterOptions[filterIndex][orIndex].key;
			searchValue = repeaterContext.filterOptions[filterIndex][orIndex].value;
		}
		else
		{
			searchArray = repeaterContext.filterOptions[filterIndex].array;
			searchKey = repeaterContext.filterOptions[filterIndex].key;
			searchValue = repeaterContext.filterOptions[filterIndex].value;
		}

		if(searchArray === undefined || searchKey === undefined || searchValue === undefined)
		{
			console.error("Invalid Comparitor", searchArray, searchKey, searchValue, viewContext.filterOptions, repeaterContext.filterOptions);
			return false;
		}
		else if(!data)
		{
			console.error("Missing/Invalid Data", data, viewContext.filterOptions, repeaterContext.filterOptions);
			return false;
		}

		var arrayData = repeaterContext.get([searchArray],data);
		if(!arrayData || !Array.isArray(arrayData))
		{
			console.error("Missing/Invalid Array Data", data, arrayData, searchArray, viewContext.filterOptions, repeaterContext.filterOptions);
			return false;
		}
		else
		{
			//Search a variable/array of variables(which are themselves arrays eg. sellerName, passed by key) to see if any of them match the search value
			if(type === "arraySearchAny")
			{
				var arrayCheck = false;
				for(var i = 0; i < arrayData.length; i++)
				{
					if(typeof searchValue === "function")
					{
						if(repeaterContext.get([searchKey], arrayData[i]).toString().trim().toLowerCase().indexOf(searchValue(viewContext).toString().trim().toLowerCase()) !== -1)
						{
							arrayCheck = true;
							break;
						}
					}
					else
					{
						if(repeaterContext.get([searchKey], arrayData[i]).toString().trim().toLowerCase().indexOf(searchValue.toString().trim().toLowerCase()) !== -1)
						{
							arrayCheck = true;
							break;
						}
					}
				}
				return arrayCheck;
			}
			else if(type === "arraySearchAll")
			{
				var arrayCheck = true;
				for(var i = 0; i < arrayData.length; i++)
				{
					if(typeof searchValue === "function")
					{
						if(repeaterContext.get([searchKey], arrayData[i]).toString().trim().toLowerCase().indexOf(searchValue(viewContext).toString().trim().toLowerCase()) !== -1)
						{
							continue;
						}
					}
					else
					{
						if(repeaterContext.get([searchKey], arrayData[i]).toString().trim().toLowerCase().indexOf(searchValue.toString().trim().toLowerCase()) !== -1)
						{
							continue;
						}
					}
					return false;
				}
				return arrayCheck;
			}
			//For when you need an exact comparison, to avoid the incomplete docs, complete docs indexOf problem
			else if(type === "arrayEqualsAny")
			{
				var arrayCheck = false;
				for(var i = 0; i < arrayData.length; i++)
				{
					if(typeof searchValue === "function")
					{
						if(repeaterContext.get([searchKey], arrayData[i]).toString().trim().toLowerCase() === searchValue(viewContext).toString().trim().toLowerCase() )
						{
							arrayCheck = true;
						}
					}
					else
					{
						if(repeaterContext.get([searchKey], arrayData[i]).toString().trim().toLowerCase() === searchValue.toString().trim().toLowerCase() )
						{
							arrayCheck = true;
						}
					}
				}
				return arrayCheck;
			}
			else if(type === "arrayEqualsAll")
			{
				var arrayCheck = true;
				for(var i = 0; i < arrayData.length; i++)
				{
					if(typeof searchValue === "function")
					{
						if(repeaterContext.get([searchKey], arrayData[i]).toString().trim().toLowerCase() === searchValue(viewContext).toString().trim().toLowerCase() )
						{
							continue;
						}
					}
					else
					{
						if(repeaterContext.get([searchKey], arrayData[i]).toString().trim().toLowerCase() === searchValue.toString().trim().toLowerCase() )
						{
							continue;
						}
					}
					return false;
				}
				return arrayCheck;
			}
		}
	}

	//Note that this referers to the calling dom-repeater, not the panel. The reason filterOptions are present are because we pass them into the dom-repeater itself
	//Index is the row number, for whatever reason we'd need that for. Pagination?
	static genericFilter(data, index)
	{
		//console.log(data, index, this.filterOptions);
		var viewContext = this.filterOptions[0].value;
		var normalFilters = ["search", "equals", "greater", "greaterEquals", "lessEquals", "less", "equalsDate", "greaterDate", "greaterEqualsDate", "lessEqualsDate", "lessDate"];
		var arrayFilters = ["arraySearchAny", "arraySearchAll", "arrayEqualsAny" ,"arrayEqualsAll"];
		//Use for loops for easy return upon false
		//Start at one, to account for forceEval at 0
		for(var i = 1; i < this.filterOptions.length; i++)
		{
			//OR each filter in an array
			if(Array.isArray(this.filterOptions[i]))
			{
				var orArray = [];
				var orNot = false;

				for(var j = 0; j < this.filterOptions[i].length; j++)
				{
					if(this.filterOptions[i][j].orNot === true)
					{
						orNot = true;
						continue;
					}
					if(normalFilters.indexOf(this.filterOptions[i][j].type) !== -1)
					{
						if(this.filterOptions[i][j].not === true)
						{
							orArray.push(!utils.keyFilter(this.filterOptions[i][j].type, viewContext, this, data, i, j));
						}
						else
						{
							orArray.push(utils.keyFilter(this.filterOptions[i][j].type, viewContext, this, data, i, j));
						}
					}
					else if(arrayFilters.indexOf(this.filterOptions[i][j].type) !== -1) 
					{
						if(this.filterOptions[i][j].not === true)
						{
							orArray.push(!utils.arrayFilter(this.filterOptions[i][j].type, viewContext, this, data, i , j));
						}
						else
						{
							orArray.push(utils.arrayFilter(this.filterOptions[i][j].type, viewContext, this, data, i , j));
						}

					}
					else
					{
						//Or nots should end up here, since they don't meet any of the other conditions
						if(this.filterOptions[i][j].orNot === undefined)
						{
							console.error("Invalid Filter", this.filterOptions[i][j]);
						}
					}
				}

				if(orArray.indexOf(true) !== -1)
				{
					if(orNot === true)
					{
						return false;
					}
					else
					{
						continue;
					}
				}
				else
				{
					if(orNot === true)
					{
						continue;
					}
					else
					{
						return false;
					}
				}
			}
			else
			{
				//TODO: Look into eliminating non-array entries due to them not playing nice with dynamic generation
				var result;
				if(normalFilters.indexOf(this.filterOptions[i].type) !== -1)
				{
					result = utils.keyFilter(this.filterOptions[i].type, viewContext, this, data, i);
				}
				else if(arrayFilters.indexOf(this.filterOptions[i].type) === -1)
				{
					result = utils.arrayFilter(this.filterOptions[i].type, viewContext, this, data, i);
				}
				else
				{
					console.error("Invalid search type", this.filterOptions[i].type);
				}

				if(result === true)
				{
					if(this.filterOptions[i].not === true)
					{
						return false;
					}
					else
					{
						continue;
					}
				}
				else
				{
					if(this.filterOptions[i].not === true)
					{
						continue;
					}
					else
					{
						return false;
					}
				}
			}
		}
		return true;
	}

	//-- Transform Functions --//
	static transformCollapseArrow(open)
	{
		if(open === true || open === undefined)
		{
			return "../../assets/icons/up-arrow-black.png";
		}
		return "../../assets/icons/down-arrow-black.png";
	}

	static transformReadableDate(momentData)
	{
		return moment(momentData).format("YYYY/MM/DD");
	}

	static transformReadableMimeType(mimeType)
	{
		var readableMimeType = utils.readableMimeTypeMap[mimeType];
		if(readableMimeType)
		{
			return readableMimeType;
		}
		else
		{
			return mimeType;
		}
	}

	static transformCurrency(value, symbol)
	{
		if(symbol)
		{
			return numeral(value).format(symbol+"0.00");
		}
		else
		{
			return numeral(value).format("$0.00");
		}
	}

	//TODO: Add in fixed/optional digits args
	static transformCurrencyInput(value)
	{
		return numeral(value).format("0.00[000000]");
	}

	static transformInteger(value)
	{
		return numeral(numeral(value).format("0")).value();
	}

	//Make sure you're properly limiting input or NAN will happen
	static transformIntegerInput(value)
	{
		return numeral(value).format("0");
	}

	static transformSignatureStatus(subscriptionAgreementDoc)
	{
		//Dirty hack to get signature status to sort business rules instead of alphabetically
		if(!subscriptionAgreementDoc)
		{
			return "0; background-color: grey;";
		}
		else if(subscriptionAgreementDoc.signed === true)
		{
			return "3; background-color: green;";
		}
		else if(subscriptionAgreementDoc.sent === true)
		{
			return "2; background-color: yellow;";
		}
		else if(subscriptionAgreementDoc.generated === true)
		{
			return "1; background-color: red;";
		}
		else
		{
			return "0; background-color: grey;";
		}
	}

	static transformBufferToB64(buffer)
	{
		var binary = '';
		var bytes = new Uint8Array(buffer);
		var len = bytes.byteLength;
		for (var i = 0; i < len; i++)
		{
			binary += String.fromCharCode(bytes[i]);
		}
		return window.btoa(binary);
	}

	static transformB64ToBlob(b64Data, contentType, sliceSize)
	{
		contentType = contentType || '';
		sliceSize = sliceSize || 512;

		var byteCharacters = atob(b64Data);
		var byteArrays = [];

		for (var offset = 0; offset < byteCharacters.length; offset += sliceSize)
		{
			var slice = byteCharacters.slice(offset, offset + sliceSize);

			var byteNumbers = new Array(slice.length);
			for (var i = 0; i < slice.length; i++)
			{
				byteNumbers[i] = slice.charCodeAt(i);
			}

			var byteArray = new Uint8Array(byteNumbers);
			byteArrays.push(byteArray);
		}

		var blob = new Blob(byteArrays, {type: contentType});
		return blob;
	}
}

//Avoid running this in browser, which will ruin everything
(function() {
	if(typeof module !== 'undefined' && module.exports)
	{
		module.exports = utils;
	}
})();
