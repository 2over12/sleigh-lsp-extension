version := "1.0.0"

build-server:
	{{justfile_directory()}}/sleigh-xtext-server/gradlew -p ./sleigh-xtext-server/ distTar

deploy-server: build-server
	rm -rf {{justfile_directory()}}/server
	mkdir -p {{justfile_directory()}}//server
	tar xf {{justfile_directory()}}/sleigh-xtext-server/ghidra.xtext.sleigh.ide/build/distributions/ghidra.xtext.sleigh.ide-{{version}}-SNAPSHOT.tar --directory {{justfile_directory()}}/server/ --strip-components 1


get-deps: 
	cd  {{justfile_directory()}} && npm install

build-extension: deploy-server get-deps
	cd  {{justfile_directory()}} && npm run-script package