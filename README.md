<div align="center">
    <p><a href="http://clarence-lang.github.io"><img src="https://raw.githubusercontent.com/clarence-lang/assets/master/clary.jpg" height=" 230"></img>
    <br>
    </br>
    C L A R E N C E - L A N G</p></a>
    <br>
	<br>
	<hr>
	<p>
		<p>
			<sup>
				<a href="https://github.com/clarence-lang">My open source work is supported by the community</a>
			</sup>
		</p>
		<sup>Special thanks to:</sup>
		<br>
		<br>
		<a href="https://github.com/botpress/botpress">
			<img src="https://sindresorhus.com/assets/thanks/botpress-logo.svg" width="260" alt="Botpress">
		</a>
		<br>
		<sub><b>Botpress is an open-source conversational assistant creation platform.</b></sub>
		<br>
		<sub>They <a href="https://github.com/botpress/botpress/blob/master/.github/CONTRIBUTING.md">welcome contributions</a> from anyone, whether you're into machine learning,<br>want to get started in open-source, or just have an improvement idea.</sub>
		<br>
		<hr>
 </div>


Clarence is a dynamic, embeddable scripting-language. It's syntax are highly inspired by Clojure. However, it features aweful new modifications on it's vm. With Clarence, you're allowed to write code, that even writes code for you! The entire core (vm, parser, interpreter, bytecode) is pretty small. It was implemented using artesian ECMAscript 16 (JavaScript). 

Clarence features a fast dynamic bytecode compilation. Similar to Just in Time compilations. You can use it for scientific computations, embeds of large projects and much much more... It's vm is written in Clarence itselfes so it got self-hosted. That's quite nice, cause while compilation, you are allowed to get some parallel compilations using macros! 

## Projects that use Clarence
---

<a href="https://github.com/clarence-lang/http-clar">clar-http       | A server sample for Clarence</a>

<a href="https://github.com/clarence-lang/cclarence">cclarence       | A stable C to Clarence compiler WIP</a>

<a href="https://github.com/clarence-lang/clar-mongoDB">clar-mongoDB | A mongoDB plugin for Clarence</a>

<a href="https://github.com/clarence-lang/clr-stdlib">clar-stdlib    | The stdlib of Clarence WIP</a>

Your's not there? File an Issue or a PR to add your project in clarence.


Sounds great? So take a look in the <a href="https://github.com/clarence-lang/clarence/tree/master/samples/simple">samples</a> directory or get even an Installer for Clarence!

## Install
---

As already said, Clarence is implemented in JS so install it's module from NPM:


```bash
$ git clone https://github.com/clarence-lang/clarence.git
$ cd clarence
$ npm install clar
```

Done!

## Running programs
---

You can run your programs like this:

Note: this is an executed example using the samples\simple directory!

```javascript
cd simple
node run <yourFile.clr>
# or do that:
node run hello.clr
```

## Style
---

Sample stylish clarence apps:

```clojure
(ns web.server)

(def http (js/require "http"))

(defn handler [request]
    { :status 200
        :headers { "Content-type" "text/html" }
        :body "Hello, World!" })
        
(defn process [req res handler]
    (let [response (handler req)
          status (get response :status 200)
          headers (get response :headers {"Content-type" "text/html"})
          body (get response :body "")]

        (.writeHead res (status (to-object headers)))
        (.end res (body))))
        
(defn run [handler port]
    (.listen (.createServer http ((fn [req res] (process req res handler)))) (port))
    (println "Server listening at port " port))
    
(run handler 3000)
```

It's a simple webserver using a http module that is parsed to clarence. It will run on http://localhost:3000

---


Made by Timo Sarkar 

Licensed under MIT
---

Domo Arigato! 

... And happy coding!
