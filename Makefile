SHA1 = $$(git rev-parse --short HEAD)

build:
	rm -rf dist && mkdir dist
	wget -q https://cdnjs.cloudflare.com/ajax/libs/zepto/1.1.6/zepto.min.js -O dist/z.js
	wget -q https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.12.0/moment.min.js -O dist/m.js
	cp lib.js dist/lib.js
	docker run --rm -v $$(pwd)/dist:/dist krkr/closure-compiler dist/lib.js dist/l.js
	cd dist && cat [a-z].js > s-$(SHA1).js