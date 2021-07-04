-- T_ROLE_STATE_MAP

EXEC ACT_role_state_map @tx_action_name = 'NEW', @id_user_mod_key = 100000, @tx_fsm_state_name='RM_DECLINED', @tx_role_name = 'RISK_MANAGER', @int_permission = 1, @tx_comment = '?'
EXEC ACT_role_state_map @tx_action_name = 'NEW', @id_user_mod_key = 100000, @tx_fsm_state_name='HOCRM_DECLINED', @tx_role_name = 'HO_CRM', @int_permission = 1, @tx_comment = '?'
EXEC ACT_role_state_map @tx_action_name = 'NEW', @id_user_mod_key = 100000, @tx_fsm_state_name='MD_DECLINED', @tx_role_name = 'MANAGING_DIRECTOR', @int_permission = 1, @tx_comment = '?'
EXEC ACT_role_state_map @tx_action_name = 'NEW', @id_user_mod_key = 100000, @tx_fsm_state_name='CEO_DECLINED', @tx_role_name = 'CEO', @int_permission = 1, @tx_comment = '?'
EXEC ACT_role_state_map @tx_action_name = 'NEW', @id_user_mod_key = 100000, @tx_fsm_state_name='UH_DECLINED', @tx_role_name = 'UNIT_HEAD', @int_permission = 1, @tx_comment = '?'

--FO
EXEC ACT_role_state_map @tx_action_name = 'NEW', @id_user_mod_key = 100000, @tx_fsm_state_name='UH_DECLINED', @tx_role_name = 'FIELD_OFFICER', @int_permission = 1, @tx_comment = '?'
EXEC ACT_role_state_map @tx_action_name = 'NEW', @id_user_mod_key = 100000, @tx_fsm_state_name='RM_DECLINED', @tx_role_name = 'FIELD_OFFICER', @int_permission = 1, @tx_comment = '?'
EXEC ACT_role_state_map @tx_action_name = 'NEW', @id_user_mod_key = 100000, @tx_fsm_state_name='HOCRM_DECLINED', @tx_role_name = 'FIELD_OFFICER', @int_permission = 1, @tx_comment = '?'
EXEC ACT_role_state_map @tx_action_name = 'NEW', @id_user_mod_key = 100000, @tx_fsm_state_name='CEO_DECLINED', @tx_role_name = 'FIELD_OFFICER', @int_permission = 1, @tx_comment = '?'
EXEC ACT_role_state_map @tx_action_name = 'NEW', @id_user_mod_key = 100000, @tx_fsm_state_name='MD_DECLINED', @tx_role_name = 'FIELD_OFFICER', @int_permission = 1, @tx_comment = '?'

--SO
EXEC ACT_role_state_map @tx_action_name = 'NEW', @id_user_mod_key = 100000, @tx_fsm_state_name='UH_DECLINED', @tx_role_name = 'SOURCE_OFFICER', @int_permission = 1, @tx_comment = '?'
EXEC ACT_role_state_map @tx_action_name = 'NEW', @id_user_mod_key = 100000, @tx_fsm_state_name='RM_DECLINED', @tx_role_name = 'SOURCE_OFFICER', @int_permission = 1, @tx_comment = '?'
EXEC ACT_role_state_map @tx_action_name = 'NEW', @id_user_mod_key = 100000, @tx_fsm_state_name='HOCRM_DECLINED', @tx_role_name = 'SOURCE_OFFICER', @int_permission = 1, @tx_comment = '?'
EXEC ACT_role_state_map @tx_action_name = 'NEW', @id_user_mod_key = 100000, @tx_fsm_state_name='CEO_DECLINED', @tx_role_name = 'SOURCE_OFFICER', @int_permission = 1, @tx_comment = '?'
EXEC ACT_role_state_map @tx_action_name = 'NEW', @id_user_mod_key = 100000, @tx_fsm_state_name='MD_DECLINED', @tx_role_name = 'SOURCE_OFFICER', @int_permission = 1, @tx_comment = '?'

--PPC
EXEC ACT_role_state_map @tx_action_name = 'NEW', @id_user_mod_key = 100000, @tx_fsm_state_name='UH_DECLINED', @tx_role_name = 'POLICE_PORTFOLIO_COORDINATOR', @int_permission = 1, @tx_comment = '?'
EXEC ACT_role_state_map @tx_action_name = 'NEW', @id_user_mod_key = 100000, @tx_fsm_state_name='RM_DECLINED', @tx_role_name = 'POLICE_PORTFOLIO_COORDINATOR', @int_permission = 1, @tx_comment = '?'
EXEC ACT_role_state_map @tx_action_name = 'NEW', @id_user_mod_key = 100000, @tx_fsm_state_name='HOCRM_DECLINED', @tx_role_name = 'POLICE_PORTFOLIO_COORDINATOR', @int_permission = 1, @tx_comment = '?'
EXEC ACT_role_state_map @tx_action_name = 'NEW', @id_user_mod_key = 100000, @tx_fsm_state_name='CEO_DECLINED', @tx_role_name = 'POLICE_PORTFOLIO_COORDINATOR', @int_permission = 1, @tx_comment = '?'
EXEC ACT_role_state_map @tx_action_name = 'NEW', @id_user_mod_key = 100000, @tx_fsm_state_name='MD_DECLINED', @tx_role_name = 'POLICE_PORTFOLIO_COORDINATOR', @int_permission = 1, @tx_comment = '?'

--CA
EXEC ACT_role_state_map @tx_action_name = 'NEW', @id_user_mod_key = 100000, @tx_fsm_state_name='UH_DECLINED', @tx_role_name = 'CREDIT_ANALYST', @int_permission = 1, @tx_comment = '?'
EXEC ACT_role_state_map @tx_action_name = 'NEW', @id_user_mod_key = 100000, @tx_fsm_state_name='RM_DECLINED', @tx_role_name = 'CREDIT_ANALYST', @int_permission = 1, @tx_comment = '?'
EXEC ACT_role_state_map @tx_action_name = 'NEW', @id_user_mod_key = 100000, @tx_fsm_state_name='HOCRM_DECLINED', @tx_role_name = 'CREDIT_ANALYST', @int_permission = 1, @tx_comment = '?'
EXEC ACT_role_state_map @tx_action_name = 'NEW', @id_user_mod_key = 100000, @tx_fsm_state_name='CEO_DECLINED', @tx_role_name = 'CREDIT_ANALYST', @int_permission = 1, @tx_comment = '?'
EXEC ACT_role_state_map @tx_action_name = 'NEW', @id_user_mod_key = 100000, @tx_fsm_state_name='MD_DECLINED', @tx_role_name = 'CREDIT_ANALYST', @int_permission = 1, @tx_comment = '?'

--CAD
EXEC ACT_role_state_map @tx_action_name = 'NEW', @id_user_mod_key = 100000, @tx_fsm_state_name='CAD_DISBURSED', @tx_role_name = 'CAD', @int_permission = 1, @tx_comment = '?'

-- T_STATE_RECOMMAND_RETURN_MAP

EXEC ACT_state_recommend_return_map @tx_action_name = 'NEW', @id_user_mod_key = 100000,@tx_from_role_name='CREDIT_ANALYST', @tx_fsm_state_name= 'UH_DECLINED', @tx_role_name='UNIT_HEAD', @int_recommend = 1, @int_return   = 0 , @tx_comment = '?'
EXEC ACT_state_recommend_return_map @tx_action_name = 'NEW', @id_user_mod_key = 100000,@tx_from_role_name='CREDIT_ANALYST', @tx_fsm_state_name= 'RM_DECLINED', @tx_role_name='UNIT_HEAD', @int_recommend = 1, @int_return   = 0 , @tx_comment = '?'
EXEC ACT_state_recommend_return_map @tx_action_name = 'NEW', @id_user_mod_key = 100000,@tx_from_role_name='CREDIT_ANALYST', @tx_fsm_state_name= 'HOCRM_DECLINED', @tx_role_name='UNIT_HEAD', @int_recommend = 1, @int_return   = 0 , @tx_comment = '?'
EXEC ACT_state_recommend_return_map @tx_action_name = 'NEW', @id_user_mod_key = 100000,@tx_from_role_name='CREDIT_ANALYST', @tx_fsm_state_name= 'CEO_DECLINED', @tx_role_name='UNIT_HEAD', @int_recommend = 1, @int_return   = 0 , @tx_comment = '?'
EXEC ACT_state_recommend_return_map @tx_action_name = 'NEW', @id_user_mod_key = 100000,@tx_from_role_name='CREDIT_ANALYST', @tx_fsm_state_name= 'MD_DECLINED', @tx_role_name='UNIT_HEAD', @int_recommend = 1, @int_return   = 0 , @tx_comment = '?'

--T_FSM_ACTION
INSERT INTO T_FSM_ACTION VALUES(110072, 0, 1, 100000, 10008, GETDATE(), 100008, 110000, 'CA_DELETE', '' )
--T_FSM_STATE
INSERT INTO T_FSM_STATE VALUES(110075, 0, 1, 100000, 100000, GETDATE(), 100000, 110000, 'CA_DELETED', '?' ,'CA_DELETED')
-- T_FSM_STATE_TRANSITION

EXEC INS_fsm_state_transition @tx_fsm_type_name='LOAN', @tx_state_name='UH_DECLINED', @tx_action_name='CA_SEND_QUERY', @tx_next_state_name='CA_SENT_QUERY',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='LOAN', @tx_state_name='RM_DECLINED', @tx_action_name='CA_SEND_QUERY', @tx_next_state_name='CA_SENT_QUERY',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='LOAN', @tx_state_name='HOCRM_DECLINED', @tx_action_name='CA_SEND_QUERY', @tx_next_state_name='CA_SENT_QUERY',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='LOAN', @tx_state_name='CEO_DECLINED', @tx_action_name='CA_SEND_QUERY', @tx_next_state_name='CA_SENT_QUERY',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='LOAN', @tx_state_name='MD_DECLINED', @tx_action_name='CA_SEND_QUERY', @tx_next_state_name='CA_SENT_QUERY',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302

EXEC INS_fsm_state_transition @tx_fsm_type_name='LOAN', @tx_state_name='UH_DECLINED', @tx_action_name='CA_RECOMMEND', @tx_next_state_name='CA_RECOMMENDED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='LOAN', @tx_state_name='RM_DECLINED', @tx_action_name='CA_RECOMMEND', @tx_next_state_name='CA_RECOMMENDED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='LOAN', @tx_state_name='HOCRM_DECLINED', @tx_action_name='CA_RECOMMEND', @tx_next_state_name='CA_RECOMMENDED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='LOAN', @tx_state_name='CEO_DECLINED', @tx_action_name='CA_RECOMMEND', @tx_next_state_name='CA_RECOMMENDED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='LOAN', @tx_state_name='MD_DECLINED', @tx_action_name='CA_RECOMMEND', @tx_next_state_name='CA_RECOMMENDED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302

EXEC INS_fsm_state_transition @tx_fsm_type_name='LOAN', @tx_state_name='UH_DECLINED', @tx_action_name='CA_UPDATE', @tx_next_state_name='CA_UPDATED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='LOAN', @tx_state_name='RM_DECLINED', @tx_action_name='CA_UPDATE', @tx_next_state_name='CA_UPDATED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='LOAN', @tx_state_name='HOCRM_DECLINED', @tx_action_name='CA_UPDATE', @tx_next_state_name='CA_UPDATED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='LOAN', @tx_state_name='CEO_DECLINED', @tx_action_name='CA_UPDATE', @tx_next_state_name='CA_UPDATED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='LOAN', @tx_state_name='MD_DECLINED', @tx_action_name='CA_UPDATE', @tx_next_state_name='CA_UPDATED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302

EXEC INS_fsm_state_transition @tx_fsm_type_name='LOAN', @tx_state_name='UH_DECLINED', @tx_action_name='CA_DELETE', @tx_next_state_name='CA_DELETED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='LOAN', @tx_state_name='RM_DECLINED', @tx_action_name='CA_DELETE', @tx_next_state_name='CA_DELETED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='LOAN', @tx_state_name='HOCRM_DECLINED', @tx_action_name='CA_DELETE', @tx_next_state_name='CA_DELETED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='LOAN', @tx_state_name='CEO_DECLINED', @tx_action_name='CA_DELETE', @tx_next_state_name='CA_DELETED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='LOAN', @tx_state_name='MD_DECLINED', @tx_action_name='CA_DELETE', @tx_next_state_name='CA_DELETED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302

EXEC INS_fsm_state_transition @tx_fsm_type_name='LOAN', @tx_state_name='SL_GENERATED', @tx_action_name='CAD_DISBURSE', @tx_next_state_name='CAD_DISBURSED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302

-- action & state add
INSERT INTO T_FSM_ACTION VALUES(110073, 0, 1, 100000, 10008, GETDATE(), 100008, 110000, 'CAD_DISBURSE', '' )

INSERT INTO T_FSM_STATE VALUES(110076, 0, 1, 100000, 100000, GETDATE(), 100000, 110000, 'CAD_DISBURSED', '?' ,'CAD_DISBURSED')



