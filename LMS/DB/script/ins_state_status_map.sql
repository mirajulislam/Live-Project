truncate table T_STATE_STATUS_MAP
go

INSERT INTO T_STATE_STATUS_MAP(id_state_status_map_ver,is_active,id_env_key,id_user_mod_key,dtt_mod,id_event_key,id_state_key,id_action_key,id_fsm_state_key,tx_state_name,tx_status_name,int_order_number)
VALUES(0,1,100000,100000,GETDATE(),100000,100000,100000,  110004,'FO_SUBMITTED','New Entry', 1)
INSERT INTO T_STATE_STATUS_MAP(id_state_status_map_ver,is_active,id_env_key,id_user_mod_key,dtt_mod,id_event_key,id_state_key,id_action_key,id_fsm_state_key,tx_state_name,tx_status_name,int_order_number)
VALUES(0,1,100000,100000,GETDATE(),100000,100000,100000,  110006,'SO_UPDATED','New Entry', 1)

INSERT INTO T_STATE_STATUS_MAP(id_state_status_map_ver,is_active,id_env_key,id_user_mod_key,dtt_mod,id_event_key,id_state_key,id_action_key,id_fsm_state_key,tx_state_name,tx_status_name,int_order_number)
VALUES(0,1,100000,100000,GETDATE(),100000,100000,100000, 110007 ,'SO_RECOMMENDED','Pending Recom(PPC)', 2)
INSERT INTO T_STATE_STATUS_MAP(id_state_status_map_ver,is_active,id_env_key,id_user_mod_key,dtt_mod,id_event_key,id_state_key,id_action_key,id_fsm_state_key,tx_state_name,tx_status_name,int_order_number)
VALUES(0,1,100000,100000,GETDATE(),100000,100000,100000, 110008 ,'SO_RE_RECOMMENDED','Pending Recom(PPC)', 2)

INSERT INTO T_STATE_STATUS_MAP(id_state_status_map_ver,is_active,id_env_key,id_user_mod_key,dtt_mod,id_event_key,id_state_key,id_action_key,id_fsm_state_key,tx_state_name,tx_status_name,int_order_number)
VALUES(0,1,100000,100000,GETDATE(),100000,100000,100000,  110056,'PEND_RECEIVED','Recom. By PPC', 3)

INSERT INTO T_STATE_STATUS_MAP(id_state_status_map_ver,is_active,id_env_key,id_user_mod_key,dtt_mod,id_event_key,id_state_key,id_action_key,id_fsm_state_key,tx_state_name,tx_status_name,int_order_number)
VALUES(0,1,100000,100000,GETDATE(),100000,100000,100000,  110016,'MIS_RECEIVED','Receive by CRM', 4)



INSERT INTO T_STATE_STATUS_MAP(id_state_status_map_ver,is_active,id_env_key,id_user_mod_key,dtt_mod,id_event_key,id_state_key,id_action_key,id_fsm_state_key,tx_state_name,tx_status_name,int_order_number) 
VALUES(0,1,100000,100000,GETDATE(),100000,100000,100000, 110046, 'CEO_APPROVED' , 'Complete' , 5)
INSERT INTO T_STATE_STATUS_MAP(id_state_status_map_ver,is_active,id_env_key,id_user_mod_key,dtt_mod,id_event_key,id_state_key,id_action_key,id_fsm_state_key,tx_state_name,tx_status_name,int_order_number) 
VALUES(0,1,100000,100000,GETDATE(),100000,100000,100000, 110040, 'HOCRM_APPROVED' , 'Complete' , 5)
INSERT INTO T_STATE_STATUS_MAP(id_state_status_map_ver,is_active,id_env_key,id_user_mod_key,dtt_mod,id_event_key,id_state_key,id_action_key,id_fsm_state_key,tx_state_name,tx_status_name,int_order_number) 
VALUES(0,1,100000,100000,GETDATE(),100000,100000,100000, 110051, 'MD_APPROVED' , 'Complete' , 5)
INSERT INTO T_STATE_STATUS_MAP(id_state_status_map_ver,is_active,id_env_key,id_user_mod_key,dtt_mod,id_event_key,id_state_key,id_action_key,id_fsm_state_key,tx_state_name,tx_status_name,int_order_number) 
VALUES(0,1,100000,100000,GETDATE(),100000,100000,100000, 110028, 'RM_APPROVED' , 'Complete' , 5)
INSERT INTO T_STATE_STATUS_MAP(id_state_status_map_ver,is_active,id_env_key,id_user_mod_key,dtt_mod,id_event_key,id_state_key,id_action_key,id_fsm_state_key,tx_state_name,tx_status_name,int_order_number) 
VALUES(0,1,100000,100000,GETDATE(),100000,100000,100000, 110034, 'UH_APPROVED' , 'Complete' , 5)

INSERT INTO T_STATE_STATUS_MAP(id_state_status_map_ver,is_active,id_env_key,id_user_mod_key,dtt_mod,id_event_key,id_state_key,id_action_key,id_fsm_state_key,tx_state_name,tx_status_name,int_order_number) 
VALUES(0,1,100000,100000,GETDATE(),100000,100000,100000, 110047, 'CEO_C_APPROVED' , 'Con. Approved' , 6)
INSERT INTO T_STATE_STATUS_MAP(id_state_status_map_ver,is_active,id_env_key,id_user_mod_key,dtt_mod,id_event_key,id_state_key,id_action_key,id_fsm_state_key,tx_state_name,tx_status_name,int_order_number) 
VALUES(0,1,100000,100000,GETDATE(),100000,100000,100000, 110041, 'HOCRM_C_APPROVED' , 'Con. Approved' , 6)
INSERT INTO T_STATE_STATUS_MAP(id_state_status_map_ver,is_active,id_env_key,id_user_mod_key,dtt_mod,id_event_key,id_state_key,id_action_key,id_fsm_state_key,tx_state_name,tx_status_name,int_order_number) 
VALUES(0,1,100000,100000,GETDATE(),100000,100000,100000, 110052, 'MD_C_APPROVED' , 'Con. Approved' , 6)
INSERT INTO T_STATE_STATUS_MAP(id_state_status_map_ver,is_active,id_env_key,id_user_mod_key,dtt_mod,id_event_key,id_state_key,id_action_key,id_fsm_state_key,tx_state_name,tx_status_name,int_order_number) 
VALUES(0,1,100000,100000,GETDATE(),100000,100000,100000, 110029, 'RM_C_APPROVED' , 'Con. Approved' , 6)
INSERT INTO T_STATE_STATUS_MAP(id_state_status_map_ver,is_active,id_env_key,id_user_mod_key,dtt_mod,id_event_key,id_state_key,id_action_key,id_fsm_state_key,tx_state_name,tx_status_name,int_order_number) 
VALUES(0,1,100000,100000,GETDATE(),100000,100000,100000, 110035, 'UH_C_APPROVED' , 'Con. Approved' , 6)




INSERT INTO T_STATE_STATUS_MAP(id_state_status_map_ver,is_active,id_env_key,id_user_mod_key,dtt_mod,id_event_key,id_state_key,id_action_key,id_fsm_state_key,tx_state_name,tx_status_name,int_order_number)  
VALUES(0,1,100000,100000,GETDATE(),100000,100000,100000,  110024, 'CA_RECOMMENDED'	, 'On Process' , 7)
INSERT INTO T_STATE_STATUS_MAP(id_state_status_map_ver,is_active,id_env_key,id_user_mod_key,dtt_mod,id_event_key,id_state_key,id_action_key,id_fsm_state_key,tx_state_name,tx_status_name,int_order_number)  
VALUES(0,1,100000,100000,GETDATE(),100000,100000,100000,  110025, 'CA_RETURNED'	, 'On Process' , 7)
INSERT INTO T_STATE_STATUS_MAP(id_state_status_map_ver,is_active,id_env_key,id_user_mod_key,dtt_mod,id_event_key,id_state_key,id_action_key,id_fsm_state_key,tx_state_name,tx_status_name,int_order_number)  
VALUES(0,1,100000,100000,GETDATE(),100000,100000,100000,  110026, 'CA_SENT_QUERY'	, 'On Process' , 7)
INSERT INTO T_STATE_STATUS_MAP(id_state_status_map_ver,is_active,id_env_key,id_user_mod_key,dtt_mod,id_event_key,id_state_key,id_action_key,id_fsm_state_key,tx_state_name,tx_status_name,int_order_number)  
VALUES(0,1,100000,100000,GETDATE(),100000,100000,100000,  110023, 'CA_UPDATED'	, 'On Process' , 7)
INSERT INTO T_STATE_STATUS_MAP(id_state_status_map_ver,is_active,id_env_key,id_user_mod_key,dtt_mod,id_event_key,id_state_key,id_action_key,id_fsm_state_key,tx_state_name,tx_status_name,int_order_number)  
VALUES(0,1,100000,100000,GETDATE(),100000,100000,100000,  110048, 'CEO_RETURNED'	, 'On Process' , 7)
INSERT INTO T_STATE_STATUS_MAP(id_state_status_map_ver,is_active,id_env_key,id_user_mod_key,dtt_mod,id_event_key,id_state_key,id_action_key,id_fsm_state_key,tx_state_name,tx_status_name,int_order_number)  
VALUES(0,1,100000,100000,GETDATE(),100000,100000,100000,  110042, 'HOCRM_RECOMMENDED'	, 'On Process' , 7)
INSERT INTO T_STATE_STATUS_MAP(id_state_status_map_ver,is_active,id_env_key,id_user_mod_key,dtt_mod,id_event_key,id_state_key,id_action_key,id_fsm_state_key,tx_state_name,tx_status_name,int_order_number)  
VALUES(0,1,100000,100000,GETDATE(),100000,100000,100000,  110043, 'HOCRM_RETURNED'	, 'On Process' , 7)
INSERT INTO T_STATE_STATUS_MAP(id_state_status_map_ver,is_active,id_env_key,id_user_mod_key,dtt_mod,id_event_key,id_state_key,id_action_key,id_fsm_state_key,tx_state_name,tx_status_name,int_order_number)  
VALUES(0,1,100000,100000,GETDATE(),100000,100000,100000,  110053, 'MD_RETURNED'	, 'On Process' , 7)
INSERT INTO T_STATE_STATUS_MAP(id_state_status_map_ver,is_active,id_env_key,id_user_mod_key,dtt_mod,id_event_key,id_state_key,id_action_key,id_fsm_state_key,tx_state_name,tx_status_name,int_order_number)  
VALUES(0,1,100000,100000,GETDATE(),100000,100000,100000,  110018, 'MIS_ALLOCATED'	, 'On Process' , 7)
INSERT INTO T_STATE_STATUS_MAP(id_state_status_map_ver,is_active,id_env_key,id_user_mod_key,dtt_mod,id_event_key,id_state_key,id_action_key,id_fsm_state_key,tx_state_name,tx_status_name,int_order_number)  
VALUES(0,1,100000,100000,GETDATE(),100000,100000,100000,  110019, 'MIS_RE_ALLOCATED'	, 'On Process' , 7)
INSERT INTO T_STATE_STATUS_MAP(id_state_status_map_ver,is_active,id_env_key,id_user_mod_key,dtt_mod,id_event_key,id_state_key,id_action_key,id_fsm_state_key,tx_state_name,tx_status_name,int_order_number)  
VALUES(0,1,100000,100000,GETDATE(),100000,100000,100000,  110030, 'RM_RECOMMENDED'	, 'On Process' , 7)
INSERT INTO T_STATE_STATUS_MAP(id_state_status_map_ver,is_active,id_env_key,id_user_mod_key,dtt_mod,id_event_key,id_state_key,id_action_key,id_fsm_state_key,tx_state_name,tx_status_name,int_order_number)  
VALUES(0,1,100000,100000,GETDATE(),100000,100000,100000,  110031, 'RM_RETURNED'	, 'On Process' , 7)
INSERT INTO T_STATE_STATUS_MAP(id_state_status_map_ver,is_active,id_env_key,id_user_mod_key,dtt_mod,id_event_key,id_state_key,id_action_key,id_fsm_state_key,tx_state_name,tx_status_name,int_order_number)  
VALUES(0,1,100000,100000,GETDATE(),100000,100000,100000,  110036, 'UH_RECOMMENDED'	, 'On Process' , 7)
INSERT INTO T_STATE_STATUS_MAP(id_state_status_map_ver,is_active,id_env_key,id_user_mod_key,dtt_mod,id_event_key,id_state_key,id_action_key,id_fsm_state_key,tx_state_name,tx_status_name,int_order_number)  
VALUES(0,1,100000,100000,GETDATE(),100000,100000,100000,  110037, 'UH_RETURNED'	, 'On Process' , 7)



INSERT INTO T_STATE_STATUS_MAP(id_state_status_map_ver,is_active,id_env_key,id_user_mod_key,dtt_mod,id_event_key,id_state_key,id_action_key,id_fsm_state_key,tx_state_name,tx_status_name,int_order_number) 
VALUES(0,1,100000,100000,GETDATE(),100000,100000,100000,  110050 , 'CEO_DEFERED'	, 'Pending' , 8)
INSERT INTO T_STATE_STATUS_MAP(id_state_status_map_ver,is_active,id_env_key,id_user_mod_key,dtt_mod,id_event_key,id_state_key,id_action_key,id_fsm_state_key,tx_state_name,tx_status_name,int_order_number) 
VALUES(0,1,100000,100000,GETDATE(),100000,100000,100000,  110045 , 'HOCRM_DEFERED'	, 'Pending' , 8)
INSERT INTO T_STATE_STATUS_MAP(id_state_status_map_ver,is_active,id_env_key,id_user_mod_key,dtt_mod,id_event_key,id_state_key,id_action_key,id_fsm_state_key,tx_state_name,tx_status_name,int_order_number) 
VALUES(0,1,100000,100000,GETDATE(),100000,100000,100000,  110055 , 'MD_DEFERED'		, 'Pending' , 8)
INSERT INTO T_STATE_STATUS_MAP(id_state_status_map_ver,is_active,id_env_key,id_user_mod_key,dtt_mod,id_event_key,id_state_key,id_action_key,id_fsm_state_key,tx_state_name,tx_status_name,int_order_number) 
VALUES(0,1,100000,100000,GETDATE(),100000,100000,100000,  110033 , 'RM_DEFERED'		, 'Pending' , 8)
INSERT INTO T_STATE_STATUS_MAP(id_state_status_map_ver,is_active,id_env_key,id_user_mod_key,dtt_mod,id_event_key,id_state_key,id_action_key,id_fsm_state_key,tx_state_name,tx_status_name,int_order_number) 
VALUES(0,1,100000,100000,GETDATE(),100000,100000,100000,  110039 , 'UH_DEFERED'		, 'Pending' , 8)


INSERT INTO T_STATE_STATUS_MAP(id_state_status_map_ver,is_active,id_env_key,id_user_mod_key,dtt_mod,id_event_key,id_state_key,id_action_key,id_fsm_state_key,tx_state_name,tx_status_name,int_order_number)  
VALUES(0,1,100000,100000,GETDATE(),100000,100000,100000, 110059	,'SL_GENERATED'	, 'Sanction Letter Generated' , 9)

