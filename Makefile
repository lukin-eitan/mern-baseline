ifndef PROJECT_ROOT
$(error PROJECT_ROOT is not set!)
endif 

sync_apis:
	cp -rf $(PROJECT_ROOT)/server/src/API $(PROJECT_ROOT)/client/src

install_all:
	cd $(PROJECT_ROOT)/client && npm i && cd $(PROJECT_ROOT)/server && npm i 

install_husky:
	cd $(PROJECT_ROOT) && npx husky

create_project_dir_tree:
	mkdir -p $(PROJECT_ROOT)/server/src

generate_env_files:
	cp $(PROJECT_ROOT)/assets/be-env-template.env $(PROJECT_ROOT)/server/.env && \
	cp $(PROJECT_ROOT)/assets/fe-env-template.env $(PROJECT_ROOT)/client/.env

setup_project: install_all generate_env_files install_husky