{
  const constants = require('../constants.js');

  function getUniqueName(name) {
    return constants[name];
  }

}
JSON_text
  = ws value:value ws { return value; }

begin_array     = ws "[" ws
begin_object    = ws "{" ws
end_array       = ws "]" ws
end_object      = ws "}" ws
name_separator  = ws ":" ws
value_separator = ws "," ws
// comands special chars
AND             = ws "AND" ws
OR              = ws "OR" ws
begin_prent     = ws "(" ws
end_prent       = ws ")" ws

ws "whitespace" = [ \t\n\r]*

// ----- 3. Values -----

value
  = pureFalse
  / pureTrue
  / pureNull
  / pureObject
  / pureArray
  / pureNumber
  / pureString
  / Expression

false = "false" { return getUniqueName('FALSE'); }
null  = "null"  { return getUniqueName('NULL');  }
true  = "true"  { return getUniqueName('TRUE');  }

// pure means that its not part of any expresssion
pureFalse = !( OR / AND) s:false !( OR / AND ) { return s; }
pureTrue = !( OR / AND) s:true !( OR / AND ) { return s; }
pureNull = !( OR / AND) s:null !( OR / AND ) { return s; }

// ----- 4. Objects -----
pureObject = !( OR / AND) s:object !( OR / AND ) { return s; }

object
  = begin_object
    members:(
      head:member
      tail:(value_separator m:member { return m; })*
      subset:subsettrailing?
      {
        var result = {};

        [head].concat(tail).forEach(function(element) {
          result[element.name] = element.value;
        });

        if (subset) {
        	result[subset] = true;
        }

        return result;
      }
    )?
    end_object
    { return members !== null ? members: {}; }

member
  = name:pureString name_separator value:value {
      return { name: name, value: value };
    }

// ----- 5. Arrays -----
pureArray = !( OR / AND) s:array !( OR / AND ) { return s; }

array
  = begin_array
    values:(
    	val:array1 { return val; }
    	/ val:array2 { return val; }
    )?
    end_array
    { return values !== null ? values : []; }

array1 =
	  head:value
    tail:(value_separator v:value { return v; })*
    subset:(value_separator s:subset { return s; })?
    {
    	const values = [head].concat(tail)
     	return subset ? values.concat([subset]) : values;
     }

array2 =
      subset:(s:subset value_separator { return s; })?
	    head:value
      tail:(value_separator v:value { return v; })*
      {
      	const values = [head].concat(tail)
      	return subset ? [subset].concat(values) : values;
      }

// ----- 6. Numbers -----

pureNumber = !( OR / AND) s:number !( OR / AND ) { return s; }

number "number"
  = minus? int frac? exp? { return parseFloat(text()); }

decimal_point
  = "."

digit1_9
  = [1-9]

e
  = [eE]

exp
  = e (minus / plus)? DIGIT+

frac
  = decimal_point DIGIT+

int
  = zero / (digit1_9 DIGIT*)

minus
  = "-"

plus
  = "+"

zero
  = "0"

// ----- 7. Strings -----

pureString = !( OR / AND) s:string !( OR / AND ) { return s; }

string "string"
  = quotation_mark chars:char* quotation_mark { return chars.join(""); }

char
  = unescaped
  / escape
    sequence:(
        '"'
      / "\\"
      / "/"
      / "b" { return "\b"; }
      / "f" { return "\f"; }
      / "n" { return "\n"; }
      / "r" { return "\r"; }
      / "t" { return "\t"; }
      / "u" digits:$(HEXDIG HEXDIG HEXDIG HEXDIG) {
          return String.fromCharCode(parseInt(digits, 16));
        }
    )
    { return sequence; }

escape
  = "\\"

quotation_mark
  = '"'

unescaped
  = [^\0-\x1F\x22\x5C]


// ----- 8. Commands -----

command "command"
  = name:LETTERS+ args:command_args?
  	{
        return {
          [getUniqueName('COMMAND')]: name.join(""),
          [getUniqueName('COMMAND_ARGS')]: args || null
        };
    }

command_args = begin_prent
	values: (
      head:args_suported_types
      tail:(value_separator v:args_suported_types { return v; })*
      value_separator?
      {
      return [head].concat(tail); }
    )
    end_prent
    { return values; }

args_suported_types = true
	/ false
    / null
    / number
    / string

// ----- 9. Commands Operations-----

Expression
 = head:Term tail:(OR Term )* {
  	const begin = head[getUniqueName('COMMAND')]
    	? [getUniqueName('COMMAND')]
      : head;

    const a = tail.reduce(function(result, element) {
      	if (element[1]) {
      		result.push(element[1]);
        }
        return result;
     }, []);
     if (a.length === 0) {
     	return head;
     }
     a.unshift(head);
     return { [getUniqueName('OR')]: a } ;
   }

Term
  = head:Factor tail:(AND Factor)* {
     const a = tail.reduce(function(result, element) {
      	if (element[1]) {
      		result.push(element[1]);
        }
        return result;
     }, []);

     if (a.length === 0) {
     	return head;
     }
	 a.unshift(head);
     return { [getUniqueName('AND')]: a } ;
    }

Factor
  = begin_prent expr:Expression end_prent { return expr; }
  / true
  / false
  / null
  / number
  / string
  / object
  / array
  / command

// ----- Core ABNF Rules -----
subset = ws "..." ws { return getUniqueName('LIKE'); }

subsettrailing = value_separator s:subset { return s; }
        		/ s:value_separator { return null; }

// See RFC 4234, Appendix B (http://tools.ietf.org/html/rfc4234).
LETTERS = [a-zA-Z]
DIGIT  = [0-9]
HEXDIG = [0-9a-f]i
