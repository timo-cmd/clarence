
var path = require('path');
var fs = require('fs');

function isValid(nsname) {
    if (nsname == null || nsname.length == 0)
        return false;
        
    if (!isLowerCaseLetter(nsname[0]))
        return false;
        
    if (!isLowerCaseLetter(nsname[nsname.length - 1]))
        return false;
        
    var names = nsname.split('.');
    
    if (names.length > 1)
        for (var k = 0; k < names.length; k++)
            if (!isValid(names[k]))
                return false;
        
    return true;
}

function isLowerCaseLetter(ch) {
    return ch >= 'a' && ch <= 'z';
}

function toFilename(nsname) {
    var names = nsname.split('.');
    var filename = '';
    
    for (var k = 0; k < names.length - 1; k++)
        filename = path.join(filename, names[k]);
        
    filename = path.join(filename, names[names.length - 1] + '.clr');
    
    return filename;
}

function resolveFilename(src, nsname) {
    if (Array.isArray(src)) {
        for (var k = 0; k < src.length; k++) {
            var result = resolveFilename(src[k], nsname);
            if (result)
                return result;
        }
        
        return null;
    }
    
    var filename = toFilename(nsname);
    
    filename = path.join(src, filename);
    
    if (fs.existsSync(filename))
        return filename;
        
    return null;
}

function toSource(filename, nsname) {
    var names = nsname.split('.');
    var source = filename;
    
    for (var k = 0; k < names.length; k++)
        source = path.dirname(source);
        
    return source;
}

module.exports = {
    isValid: isValid,
    toFilename: toFilename,
    resolveFilename: resolveFilename,
    toSource: toSource
}

