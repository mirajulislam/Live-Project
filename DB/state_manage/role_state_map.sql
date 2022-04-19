INSERT INTO T_ROLE VALUES(110047, 0, 1, 100000, 100000, GETDATE(), 0, 0, 0, 'DISPUTE_MANAGER', '?' )

--FSM_TYPE
INSERT INTO T_FSM_TYPE VALUES(110003, 0, 1, 100000, 0, GETDATE(), 0, 'ATM_DISPUTE', 'BANK ATM DISPUTE')

--state name
INSERT INTO T_FSM_STATE VALUES(110127, 0, 1, 100000, 100000, GETDATE(), 100000, 110003, 'NEW', '?' ,'NEW')
INSERT INTO T_FSM_STATE VALUES(110128, 0, 1, 100000, 100000, GETDATE(), 100000, 110003, 'REJECTED', '?' ,'REJECTED')
INSERT INTO T_FSM_STATE VALUES(110129, 0, 1, 100000, 100000, GETDATE(), 100000, 110003, 'RESOLVED', '?' ,'RESOLVED')
INSERT INTO T_FSM_STATE VALUES(110130, 0, 1, 100000, 100000, GETDATE(), 100000, 110003, 'UNDEF', '?' ,'UNDEF')
INSERT INTO T_FSM_STATE VALUES(110131, 0, 1, 100000, 100000, GETDATE(), 100000, 110003, 'REQUESTED', '?' ,'REQUESTED')

--action name

INSERT INTO T_FSM_ACTION VALUES(110104, 0, 1, 100000, 100000, GETDATE(), 100000, 110003, 'NEW_DISPUTE', 'NEW_DISPUTE' )
INSERT INTO T_FSM_ACTION VALUES(110105, 0, 1, 100000, 100000, GETDATE(), 100000, 110003, 'REJECTED_DISPUTE', 'REJECTED_DISPUTE' )
INSERT INTO T_FSM_ACTION VALUES(110106, 0, 1, 100000, 100000, GETDATE(), 100000, 110003, 'RESOLVED_DISPUTE', 'RESOLVED_DISPUTE' )
INSERT INTO T_FSM_ACTION VALUES(110107, 0, 1, 100000, 100000, GETDATE(), 100000, 110003, 'USER_REQUESTED', 'USER_REQUESTED' )

INSERT INTO T_ROLE VALUES(110047, 0, 1, 100000, 100000, GETDATE(), 0, 0, 0, 'DISPUTE_MANAGER', '?' )

--transaction

EXEC INS_fsm_state_transition @tx_fsm_type_name='ATM_DISPUTE', @tx_state_name='UNDEF', @tx_action_name='NEW_DISPUTE', @tx_next_state_name='NEW',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='ATM_DISPUTE', @tx_state_name='UNDEF', @tx_action_name='USER_REQUESTED', @tx_next_state_name='REQUESTED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='ATM_DISPUTE', @tx_state_name='NEW', @tx_action_name='USER_REQUESTED', @tx_next_state_name='REQUESTED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='ATM_DISPUTE', @tx_state_name='REQUESTED', @tx_action_name='REJECTED_DISPUTE', @tx_next_state_name='REJECTED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
EXEC INS_fsm_state_transition @tx_fsm_type_name='ATM_DISPUTE', @tx_state_name='REQUESTED', @tx_action_name='RESOLVED_DISPUTE', @tx_next_state_name='RESOLVED',  @tx_login_name='nazdaq_prod',@id_user_mod_key = 110302
