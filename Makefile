SHA1 = $$(git rev-parse --short HEAD)
V = 11

dist: clean
	rm -rf dist && mkdir dist
	wget -q https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js -O dist/j.js
	wget -q https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.7/semantic.min.js -O dist/s.js
	wget -q https://cdnjs.cloudflare.com/ajax/libs/zepto/1.2.0/zepto.min.js -O dist/z.js
	wget -q https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.17.1/moment.min.js -O dist/m.js
	cp lib.js dist/lib.js
	docker run --rm -v $$(pwd)/dist:/dist krkr/closure-compiler dist/lib.js dist/u.js
	cd dist && cat u.js > s.$(V).$(SHA1).js
	cd dist && cat [ju].js > s.$(V).$(SHA1).j.js
	cd dist && cat [zu].js > s.$(V).$(SHA1).z.js
	cd dist && cat [jmu].js > s.$(V).$(SHA1).jm.js
	cd dist && cat [zmu].js > s.$(V).$(SHA1).zm.js
	cd dist && cat [jsu].js > s.$(V).$(SHA1).js.js
	cd dist && cat [zsu].js > s.$(V).$(SHA1).zs.js
	cd dist && cat [jsmu].js > s.$(V).$(SHA1).jsm.js
	cd dist && cat [zsmu].js > s.$(V).$(SHA1).zsm.js

clean:
	rm -rf dist

doc-gen:
	@grep -A1 '//@' lib.js \
		| sed -e "s|.*@ |# |" -e "s/.*function //" -e "s/ {//" \
		| sed "s/--//"
