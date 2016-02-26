IMAGES := $(wildcard src/img/*)
IMAGES := $(patsubst src/%, dist/%, $(IMAGES))

STYLESHEETS := $(wildcard src/css/*.sass) $(wildcard src/css/*.css)
STYLESHEETS := $(patsubst src/%, dist/%, $(STYLESHEETS))
STYLESHEETS := $(patsubst %.sass, %.css, $(STYLESHEETS))

JS := $(wildcard src/js/*.js)
JS := $(patsubst src/%, dist/%, $(JS))

HTML_FILES := $(wildcard src/*.html)

.PHONY: all
all: dist/index.html $(STYLESHEETS) $(IMAGES) $(JS)
	@echo > /dev/null

.PHONY: clean
clean:
	$(RM) -r dist/

dist/%.css: src/%.sass
	@mkdir -p $(dir $@)
	sass $< $@

dist/%.css: src/%.css
	@mkdir -p $(dir $@)
	cp $< $@

dist/%.js: src/%.js
	@mkdir -p $(dir $@)
	cp $< $@

dist/index.html: src/index.html $(HTML_FILES)
	@mkdir -p $(dir $@)
	# cpp -nostdinc $< > $@
	cp $< $@

dist/%: src/%
	@mkdir -p $(dir $@)
	cp $< $@

