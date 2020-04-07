
var lists = require('./list');
var vectors = require('./vector');
var sets = require('./set');
var maps = require('./map');
var lazyseqs = require('./lazyseq');
var utils = require('./utils');

if (typeof clr == 'undefined')
    clr = {};
    
if (typeof clr.core == 'undefined')
    clr.core = {};
    
clr.core.list = function () {
    return lists.create(arguments);
}

clr.core.first = function (list) { return list == null ? null : list.first(); }

clr.core.next = function (list) { return list.next(); }

clr.core.rest = function (list) { return list.rest(); }

clr.core.pop = function (list) { 
    if (list.pop)
        return list.pop();

    return list.rest(); 
}

clr.core.nth = function (list, n, defvalue) {
    if (list == null || lists.isEmptyList(list))
        if (defvalue != null)
            return defvalue;
        else
            return null;
    
    if (vectors.isVector(list)) {
        if (n < list.length())
            return list.get(n);
            
        if (defvalue != null)
            return defvalue;
        else
            return null;
    }
    
    while (n > 0) {
        list = list.next();
        n--;
        
        if (!list)
            if (defvalue != null)
                return defvalue;
            else
                return null;
    }
        
    return list.first(); 
}

clr.core.cons = function (first, next) { return lists.list(first, clr.core.seq(next)); }

clr.core.seq = function (value) {
    if (value == null)
        return null;
        
    if (lists.isEmptyList(value))
        return null;
        
    if (vectors.isVector(value)) {
        if (value.length() == 0)
            return null;
        else
            return lists.create(value.asArray());
    }
    
    if (sets.isSet(value)) {
        var keys = value.getKeys();
        
        if (keys.length == 0)
            return null;
            
        return lists.create(keys);
    }
        
    if (lists.isList(value))
        return value;
        
    if (lazyseqs.isLazySeq(value))
        return value;
        
    if (maps.isMap(value)) {
        var result = [];
        var keys = value.getKeys();
        
        if (keys.length == 0)
            return null;
            
        for (var n in keys) {
            var key = keys[n];
            var val = value.get(key);
            result.push(vectors.create([key, val]));
        }        
        
        return lists.create(result);
    }
        
    if (typeof value == 'string')
        if (value == '')
            return null;
        else
            return lists.create(value.split(''));
        
    if (Array.isArray(value))
        if (value.length == 0)
            return null;
        else
            return lists.create(value);

    throw new Error("Don't know how to create sequence from: " + value);
}

clr.core.length = function (value) { return value.length(); }

clr.core.equals = function (value1, value2) {
    return utils.equals(value1, value2);
}

clr.core.str = function () {
    var result = '';
    var l = arguments.length;
    
    for (var k = 0; k < l; k++) {
        var arg = arguments[k];
        
        if (arg == null)
            result += 'nil';
        else if (arg.asString)
            result += arg.asString();
        else
            result += arg.toString();
    }
    
    return result;
}

clr.core.throw = function (ex) { throw ex; }

clr.core.less = function (a, b ) { return a < b; }
clr.core.lessEqual = function (a, b ) { return a <= b; }
clr.core.greater = function (a, b ) { return a > b; }
clr.core.greaterEqual = function (a, b ) { return a >= b; }

clr.core.empty = function (value) {
    if (lists.isList(value))
        return lists.emptyList;
        
    if (vectors.isVector(value))
        return vectors.create([]);
        
    if (maps.isMap(value))
        return maps.create([]);
        
    if (sets.isSet(value))
        return sets.create([]);
}

clr.core.rand = function (n) {
    if (n == null)
        return Math.random();
        
    return Math.random() * n;
}

clr.core.rand_HY_int = function (n) {
    return Math.floor(Math.random() * n);
}

function isEmpty(value) {
    if (value == null)
        return true;
        
    if (lists.isEmptyList(value))
        return true;
        
    if (value.isEmpty)
        return value.isEmpty();
        
    return false;
}