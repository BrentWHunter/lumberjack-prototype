var isNodejs = (typeof(module) === 'object' && module != null && typeof(module.exports) === 'object' && module.exports != null);

(function() {
	if (isNodejs)
	{
		global.utils = require('polymer-components/utils.js');
	}
})();

class quantumModel
{
	constructor(data, mode)
	{
		if (mode === "invalid")
		{
			utils.invalidConstructor(this, data);
		}
		else if (mode === "dirty")
		{
			utils.dirtyConstructor(this, data);
		}
		else
		{
			utils.commonConstructor(this, data);
		}
	}

	get(propertyPath)
	{
		if (typeof(propertyPath) !== 'string')
		{
			throw new Error("'propertyPath' must be a string.");
		}

		try
		{
			var keys = propertyPath.split(".");
			var value = this;
			for (var i in keys)
			{
				value = value[keys[i]];
			}
			return value;
		}
		catch(err)
		{
			console.debug(err);
			return undefined;
		}
	}

	clearDirtyProperties()
	{
		delete this._dirtyProperties;
	}

	clearInvalidProperties()
	{
		delete this._invalidProperties;
	}

	clearRuntimeProperties()
	{
		this.clearDirtyProperties();
		this.clearInvalidProperties();
	}

	initDirtyProperties()
	{
		//TODO: Once everything actually works in the UI, see how this function behaves before probably removing it.
		this.clearDirtyProperties();

		utils.dirtyConstructor(this, this);
	}

	initInvalidProperties()
	{
		//TODO: Once everything actually works in the UI, see how this function behaves before probably removing it.
		this.clearInvalidProperties();

		utils.invalidConstructor(this, this);
	}
}

(function() {
	if (isNodejs)
	{
		module.exports = {
			quantumModel: quantumModel
		};
	}
})();