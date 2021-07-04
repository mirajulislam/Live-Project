EXEC ACT_state_recommend_return_map @tx_action_name = 'NEW', @id_user_mod_key = 100000,@tx_from_role_name='CAD', @tx_fsm_state_name= 'SL_GENERATED', @tx_role_name='SOURCE_OFFICER', @int_recommend = 0, @int_return   = 1 , @tx_comment = '?'

EXEC INS_fsm_state_transition @tx_fsm_type_name='LOAN', @tx_state_name='SL_GENERATED', @tx_action_name='CAD_RETURN', @tx_next_state_name='CAD_RETURNED',  @tx_login_name='nazdaq_prod'
EXEC INS_fsm_state_transition @tx_fsm_type_name='LOAN', @tx_state_name='CAD_RETURNED', @tx_action_name='SO_UPDATE', @tx_next_state_name='SO_UPDATED',  @tx_login_name='nazdaq_prod'
