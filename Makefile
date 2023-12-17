ifndef PROJECT_ROOT
$(error PROJECT_ROOT is not set!)
endif 

sync_apis:
	cp -rf $(PROJECT_ROOT)/server/src/API $(PROJECT_ROOT)/client/src

create_project_dir_tree:
	mkdir -p $(PROJECT_ROOT)/server/src