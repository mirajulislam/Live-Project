T_FSM_TYPE
INSERT INTO T_FSM_TYPE VALUES(110002, 0, 1, 100000, 0, GETDATE(), 0, 'CREDIT_CARD', 'Bank Credit Card')


T_ROLE:

INSERT INTO T_ROLE VALUES(110040, 0, 1, 100000, 100000, GETDATE(), 0, 0, 0, 'FIELD_ORIGINATOR', '?' )
INSERT INTO T_ROLE VALUES(110041, 0, 1, 100000, 100000, GETDATE(), 0, 0, 0, 'CARD_OFFICER', '?' )
INSERT INTO T_ROLE VALUES(110042, 0, 1, 100000, 100000, GETDATE(), 0, 0, 0, 'HEAD_OF_CARD', '?' )
INSERT INTO T_ROLE VALUES(110043, 0, 1, 100000, 100000, GETDATE(), 0, 0, 0, 'CD', '?' )
INSERT INTO T_ROLE VALUES(110044, 0, 1, 100000, 100000, GETDATE(), 0, 0, 0, 'CO', '?' )

T_FSM_STATE:

INSERT INTO T_FSM_STATE VALUES(110077, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'C_OFFICER_RECOMMENDED', '?' ,'C_OFFICER_RECOMMENDED')
INSERT INTO T_FSM_STATE VALUES(110078, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'C_OFFICER_UPDATED', '?' ,'C_OFFICER_UPDATED')
INSERT INTO T_FSM_STATE VALUES(110079, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'CA_QUERY_TO_C_OFFICER', '?' ,'CA_QUERY_TO_C_OFFICER')
INSERT INTO T_FSM_STATE VALUES(110080, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'CA_QUERY_TO_C_OFFICER_UPDATED', '?' ,'CA_QUERY_TO_C_OFFICER_UPDATED')
INSERT INTO T_FSM_STATE VALUES(110081, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'CA_RECOMMENDED', '?' ,'CA_RECOMMENDED')
INSERT INTO T_FSM_STATE VALUES(110082, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'CA_RESENT', '?' ,'CA_RESENT')
INSERT INTO T_FSM_STATE VALUES(110083, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'CA_RETURNED', '?' ,'CA_RETURNED')
INSERT INTO T_FSM_STATE VALUES(110084, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'CA_UPDATED', '?' ,'CA_UPDATED')
INSERT INTO T_FSM_STATE VALUES(110085, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'CD_AGREED', '?' ,'CD_AGREED')
INSERT INTO T_FSM_STATE VALUES(110086, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'CD_REJECT', '?' ,'CD_REJECT')
INSERT INTO T_FSM_STATE VALUES(110087, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'CO_QUERY_TO_C_OFFICER', '?' ,'CO_QUERY_TO_C_OFFICER')
INSERT INTO T_FSM_STATE VALUES(110088, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'CO_QUERY_TO_C_OFFICER_UPDATED', '?' ,'CO_QUERY_TO_C_OFFICER_UPDATED')
INSERT INTO T_FSM_STATE VALUES(110089, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'CO_QUERY_TO_CA', '?' ,'CO_QUERY_TO_CA')
INSERT INTO T_FSM_STATE VALUES(110090, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'CO_QUERY_TO_CA_UPDATED', '?' ,'CO_QUERY_TO_CA_UPDATED')
INSERT INTO T_FSM_STATE VALUES(110091, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'FO_CREATED', '?' ,'FO_CREATED')
INSERT INTO T_FSM_STATE VALUES(110092, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'FO_DELETED', '?' ,'FO_DELETED')
INSERT INTO T_FSM_STATE VALUES(110093, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'FO_RECOMMENDED', '?' ,'FO_RECOMMENDED')
INSERT INTO T_FSM_STATE VALUES(110094, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'FO_UPDATED', '?' ,'FO_UPDATED')
INSERT INTO T_FSM_STATE VALUES(110095, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'HOC_RECOMMENDED', '?' ,'HOC_RECOMMENDED')
INSERT INTO T_FSM_STATE VALUES(110096, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'HOC_RETURNED', '?' ,'HOC_RETURNED')
INSERT INTO T_FSM_STATE VALUES(110097, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'HOCRM_APPROVE', '?' ,'HOCRM_APPROVE')
INSERT INTO T_FSM_STATE VALUES(110098, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'HOCRM_REMOVED_FROM_GROUP', '?' ,'HOCRM_REMOVED_FROM_GROUP')
INSERT INTO T_FSM_STATE VALUES(110099, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'RM_APPROVE', '?' ,'RM_APPROVE')
INSERT INTO T_FSM_STATE VALUES(110100, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'RM_DECLINE', '?' ,'RM_DECLINE')
INSERT INTO T_FSM_STATE VALUES(110101, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'RM_RECOMMENDED_TO_CD', '?' ,'RM_RECOMMENDED_TO_CD')
INSERT INTO T_FSM_STATE VALUES(110102, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'RM_RECOMMENDED_TO_HOCRM', '?' ,'RM_RECOMMENDED_TO_HOCRM')
INSERT INTO T_FSM_STATE VALUES(110103, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'RM_RECOMMENDED_TO_UH', '?' ,'RM_RECOMMENDED_TO_UH')
INSERT INTO T_FSM_STATE VALUES(110104, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'RM_RETURN', '?' ,'RM_RETURN')
INSERT INTO T_FSM_STATE VALUES(110105, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'SENT_TO_CO', '?' ,'SENT_TO_CO')
INSERT INTO T_FSM_STATE VALUES(110106, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'UH_APPROVE', '?' ,'UH_APPROVE')
INSERT INTO T_FSM_STATE VALUES(110107, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'UH_DECLINE', '?' ,'UH_DECLINE')
INSERT INTO T_FSM_STATE VALUES(110108, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'UH_QUERY_TO_CA', '?' ,'UH_QUERY_TO_CA')
INSERT INTO T_FSM_STATE VALUES(110109, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'UH_QUERY_TO_CA_UPDATED', '?' ,'UH_QUERY_TO_CA_UPDATED')
INSERT INTO T_FSM_STATE VALUES(110110, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'UH_RECOMMENDED_TO_CD', '?' ,'UH_RECOMMENDED_TO_CD')

T_FSM_ACTION

INSERT INTO T_FSM_ACTION VALUES(110074, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'SAVE', 'SAVE' )
INSERT INTO T_FSM_ACTION VALUES(110075, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'NEW', 'NEW' )
INSERT INTO T_FSM_ACTION VALUES(110076, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'UPDATE', 'UPDATE' )
INSERT INTO T_FSM_ACTION VALUES(110077, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'RECOMMEND', 'RECOMMEND' )
INSERT INTO T_FSM_ACTION VALUES(110078, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'DELETE', 'DELETE' )
INSERT INTO T_FSM_ACTION VALUES(110079, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'RETURN', 'RETURN' )
INSERT INTO T_FSM_ACTION VALUES(110080, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'RESEND', 'RESEND' )
INSERT INTO T_FSM_ACTION VALUES(110081, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'QUERY_TO_C_OFFICER', 'QUERY_TO_C_OFFICER' )
INSERT INTO T_FSM_ACTION VALUES(110082, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'RECOMMEND_TO_UH', 'RECOMMEND_TO_UH' )
INSERT INTO T_FSM_ACTION VALUES(110083, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'RECOMMEND_TO_CD', 'RECOMMEND_TO_CD' )
INSERT INTO T_FSM_ACTION VALUES(110084, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'RECOMMEND_TO_HOCRM', 'RECOMMEND_TO_HOCRM' )
INSERT INTO T_FSM_ACTION VALUES(110085, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'DECLINE', 'DECLINE' )
INSERT INTO T_FSM_ACTION VALUES(110086, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'APPROVE', 'APPROVE' )
INSERT INTO T_FSM_ACTION VALUES(110087, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'QUERY_TO_CA', 'QUERY_TO_CA' )
INSERT INTO T_FSM_ACTION VALUES(110088, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'SEND_TO_CO', 'SEND_TO_CO' )
INSERT INTO T_FSM_ACTION VALUES(110089, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'AGREE', 'AGREE' )
INSERT INTO T_FSM_ACTION VALUES(110090, 0, 1, 100000, 100000, GETDATE(), 100000, 110002, 'REJECT', 'REJECT' )


FSM_STATE_TRAN

EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='UNDEF', @tx_action_name='SAVE', @tx_next_state_name='FO_CREATED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='UNDEF', @tx_action_name='NEW', @tx_next_state_name='FO_CREATED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='FO_CREATED', @tx_action_name='UPDATE', @tx_next_state_name='FO_UPDATED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='FO_UPDATED', @tx_action_name='UPDATE', @tx_next_state_name='FO_UPDATED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='FO_UPDATED', @tx_action_name='RECOMMEND', @tx_next_state_name='FO_RECOMMENDED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='FO_CREATED', @tx_action_name='DELETE', @tx_next_state_name='FO_DELETED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='FO_UPDATED', @tx_action_name='DELETE', @tx_next_state_name='FO_DELETED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='FO_RECOMMENDED', @tx_action_name='UPDATE', @tx_next_state_name='C_OFFICER_UPDATED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='C_OFFICER_UPDATED', @tx_action_name='UPDATE', @tx_next_state_name='C_OFFICER_UPDATED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='C_OFFICER_UPDATED', @tx_action_name='RECOMMEND', @tx_next_state_name='C_OFFICER_RECOMMENDED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='HOC_RETURNED', @tx_action_name='UPDATE', @tx_next_state_name='C_OFFICER_UPDATED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='CA_QUERY_TO_C_OFFICER', @tx_action_name='UPDATE', @tx_next_state_name='CA_QUERY_TO_C_OFFICER_UPDATED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='CO_QUERY_TO_C_OFFICER', @tx_action_name='UPDATE', @tx_next_state_name='CO_QUERY_TO_C_OFFICER_UPDATED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='C_OFFICER_RECOMMENDED', @tx_action_name='RECOMMEND', @tx_next_state_name='HOC_RECOMMENDED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='C_OFFICER_RECOMMENDED', @tx_action_name='RETURN', @tx_next_state_name='HOC_RETURNED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='CA_UPDATED', @tx_action_name='UPDATE', @tx_next_state_name='CA_UPDATED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='CA_UPDATED', @tx_action_name='RECOMMEND', @tx_next_state_name='CA_RECOMMENDED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='CA_UPDATED', @tx_action_name='RETURN', @tx_next_state_name='CA_RETURNED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='HOC_RECOMMENDED', @tx_action_name='RETURN', @tx_next_state_name='CA_RETURNED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='RM_RETURN', @tx_action_name='UPDATE', @tx_next_state_name='CA_UPDATED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='RM_DECLINE', @tx_action_name='UPDATE', @tx_next_state_name='CA_UPDATED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='UH_DECLINE', @tx_action_name='UPDATE', @tx_next_state_name='CA_UPDATED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='CD_REJECT', @tx_action_name='RESEND', @tx_next_state_name='CA_RESENT',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='HOCRM_REMOVED_FROM_GROUP', @tx_action_name='UPDATE', @tx_next_state_name='CA_UPDATED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='CA_UPDATED', @tx_action_name='QUERY_TO_C_OFFICER', @tx_next_state_name='CA_QUERY_TO_C_OFFICER',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='HOC_RECOMMENDED', @tx_action_name='QUERY_TO_C_OFFICER', @tx_next_state_name='CA_QUERY_TO_C_OFFICER',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='HOCRM_REMOVED_FROM_GROUP', @tx_action_name='QUERY_TO_C_OFFICER', @tx_next_state_name='CA_QUERY_TO_C_OFFICER',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='CA_QUERY_TO_C_OFFICER_UPDATED', @tx_action_name='UPDATE', @tx_next_state_name='CA_UPDATED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='CA_QUERY_TO_C_OFFICER_UPDATED', @tx_action_name='RECOMMEND', @tx_next_state_name='CA_RECOMMENDED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='CA_QUERY_TO_C_OFFICER_UPDATED', @tx_action_name='RETURN', @tx_next_state_name='CA_RETURNED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='CA_QUERY_TO_C_OFFICER_UPDATED', @tx_action_name='RESEND', @tx_next_state_name='CA_RESENT',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='CA_QUERY_TO_C_OFFICER_UPDATED', @tx_action_name='QUERY_TO_C_OFFICER', @tx_next_state_name='CA_QUERY_TO_C_OFFICER',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='UH_QUERY_TO_CA', @tx_action_name='UPDATE', @tx_next_state_name='UH_QUERY_TO_CA_UPDATED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='CO_QUERY_TO_CA', @tx_action_name='UPDATE', @tx_next_state_name='CO_QUERY_TO_CA_UPDATED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='CA_RECOMMENDED', @tx_action_name='RECOMMEND_TO_UH', @tx_next_state_name='RM_RECOMMENDED_TO_UH',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='CA_RECOMMENDED', @tx_action_name='RECOMMEND_TO_CD', @tx_next_state_name='RM_RECOMMENDED_TO_CD',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='CA_RECOMMENDED', @tx_action_name='RECOMMEND_TO_HOCRM', @tx_next_state_name='RM_RECOMMENDED_TO_HOCRM',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='CA_RECOMMENDED', @tx_action_name='RETURN', @tx_next_state_name='RM_RETURN',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='CA_RECOMMENDED', @tx_action_name='DECLINE', @tx_next_state_name='RM_DECLINE',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='CA_RECOMMENDED', @tx_action_name='APPROVE', @tx_next_state_name='UH_APPROVE',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='RM_RECOMMENDED_TO_UH', @tx_action_name='APPROVE', @tx_next_state_name='UH_APPROVE',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='CA_RECOMMENDED', @tx_action_name='RECOMMEND', @tx_next_state_name='UH_RECOMMENDED_TO_CD',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='RM_RECOMMENDED_TO_UH', @tx_action_name='RECOMMEND', @tx_next_state_name='UH_RECOMMENDED_TO_CD',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='CA_RECOMMENDED', @tx_action_name='DECLINE', @tx_next_state_name='UH_DECLINE',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='RM_RECOMMENDED_TO_UH', @tx_action_name='DECLINE', @tx_next_state_name='UH_DECLINE',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='CA_RECOMMENDED', @tx_action_name='QUERY_TO_CA', @tx_next_state_name='UH_QUERY_TO_CA',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='UH_QUERY_TO_CA_UPDATED', @tx_action_name='APPROVE', @tx_next_state_name='UH_APPROVE',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='UH_QUERY_TO_CA_UPDATED', @tx_action_name='RECOMMEND', @tx_next_state_name='UH_RECOMMENDED_TO_CD',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='UH_QUERY_TO_CA_UPDATED', @tx_action_name='DECLINE', @tx_next_state_name='UH_DECLINE',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='UH_QUERY_TO_CA_UPDATED', @tx_action_name='QUERY_TO_CA', @tx_next_state_name='UH_QUERY_TO_CA',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='RM_RECOMMENDED_TO_HOCRM', @tx_action_name='APPROVE', @tx_next_state_name='HOCRM_APPROVE',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='HOCRM_APPROVE', @tx_action_name='SEND_TO_CO', @tx_next_state_name='SENT_TO_CO',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='RM_APPROVE', @tx_action_name='SEND_TO_CO', @tx_next_state_name='SENT_TO_CO',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='UH_APPROVE', @tx_action_name='SEND_TO_CO', @tx_next_state_name='SENT_TO_CO',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='RM_RECOMMENDED_TO_CD', @tx_action_name='AGREE', @tx_next_state_name='CD_AGREED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='UH_RECOMMENDED_TO_CD', @tx_action_name='AGREE', @tx_next_state_name='CD_AGREED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='RM_RECOMMENDED_TO_CD', @tx_action_name='REJECT', @tx_next_state_name='CD_REJECT',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='UH_RECOMMENDED_TO_CD', @tx_action_name='REJECT', @tx_next_state_name='CD_REJECT',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='SENT_TO_CO', @tx_action_name='QUERY_TO_CA', @tx_next_state_name='CO_QUERY_TO_CA',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='SENT_TO_CO', @tx_action_name='QUERY_TO_C_OFFICER', @tx_next_state_name='CO_QUERY_TO_C_OFFICER',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='CO_QUERY_TO_CA_UPDATED', @tx_action_name='QUERY_TO_CA', @tx_next_state_name='CO_QUERY_TO_CA',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='CO_QUERY_TO_CA_UPDATED', @tx_action_name='QUERY_TO_C_OFFICER', @tx_next_state_name='CO_QUERY_TO_C_OFFICER',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='CO_QUERY_TO_C_OFFICER_UPDATED', @tx_action_name='QUERY_TO_CA', @tx_next_state_name='CO_QUERY_TO_CA',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='CREDIT_CARD', @tx_state_name='CO_QUERY_TO_C_OFFICER_UPDATED', @tx_action_name='QUERY_TO_C_OFFICER', @tx_next_state_name='CO_QUERY_TO_C_OFFICER',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
