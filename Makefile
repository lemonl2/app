dev: clean
	node_modules/.bin/webpack-dev-server --open --progress --colors

clean:
	rm -rf dist/*

install:
	npm i --registry=https://registry.npm.taobao.org --cache=$HOME/.npm/.cache/cnpm --disturl=https://npm.taobao.org/dist --userconfig=$HOME/.cnpmrc --production --no-optional
	npm update --registry=https://registry.npm.taobao.org --cache=$HOME/.npm/.cache/cnpm --disturl=https://npm.taobao.org/dist --userconfig=$HOME/.cnpmrc --production --no-optional

build: clean
	node_modules/.bin/webpack --env=dev --profile
