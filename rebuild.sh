#!/bin/sh
docker run --rm \
	-v $HOME/sagemath/myfork-sagecell/js:/home/sage/sagecell/js:ro \
	-v $HOME/sagemath/myfork-sagecell/build/services:/home/sage/sagecell/build/services:ro \
	-v $HOME/sagemath/myfork-sagecell/static:/home/sage/sagecell/static:rw \
	--entrypoint make \
	luisjba/sagecell:latest

