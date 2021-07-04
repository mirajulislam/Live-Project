INSERT INTO T_FSM_TYPE (id_fsm_type_key, id_fsm_type_ver, is_active, id_env_key, id_user_mod_key, dtt_mod, id_event_key, tx_fsm_type_name, tx_fsm_type_desc)
VALUES (110016 ,0, 1, 100000,  0, GETDATE(), 0, 'LOAN', 'loan')

INSERT INTO T_FSM_STATE (id_fsm_state_key, id_fsm_state_ver, is_active, id_env_key, id_user_mod_key, dtt_mod, id_event_key, id_fsm_type_key, tx_state_name, tx_state_desc)
VALUES (120000, 0, 1, 100000,  0, GETDATE(), 0, 110016, 'ALLOCATED', '?')

INSERT INTO T_FSM_STATE (id_fsm_state_key, id_fsm_state_ver, is_active, id_env_key, id_user_mod_key, dtt_mod, id_event_key, id_fsm_type_key, tx_state_name, tx_state_desc)
VALUES (120001, 0, 1, 100000,  0, GETDATE(), 0, 110016, 'BM', '?')

INSERT INTO T_FSM_STATE (id_fsm_state_key, id_fsm_state_ver, is_active, id_env_key, id_user_mod_key, dtt_mod, id_event_key, id_fsm_type_key, tx_state_name, tx_state_desc)
VALUES (120002, 0, 1, 100000,  0, GETDATE(), 0, 110016, 'BOM', '?')

INSERT INTO T_FSM_STATE (id_fsm_state_key, id_fsm_state_ver, is_active, id_env_key, id_user_mod_key, dtt_mod, id_event_key, id_fsm_type_key, tx_state_name, tx_state_desc)
VALUES (120003, 0, 1, 100000,  0, GETDATE(), 0, 110016, 'CBO_APPROVED', '?')

INSERT INTO T_FSM_STATE (id_fsm_state_key, id_fsm_state_ver, is_active, id_env_key, id_user_mod_key, dtt_mod, id_event_key, id_fsm_type_key, tx_state_name, tx_state_desc)
VALUES (120004, 0, 1, 100000,  0, GETDATE(), 0, 110016, 'CBO_C_APPROVED', '?')

INSERT INTO T_FSM_STATE (id_fsm_state_key, id_fsm_state_ver, is_active, id_env_key, id_user_mod_key, dtt_mod, id_event_key, id_fsm_type_key, tx_state_name, tx_state_desc)
VALUES (120005, 0, 1, 100000,  0, GETDATE(), 0, 110016, 'CBO_DECLINED', '?')

INSERT INTO T_FSM_STATE (id_fsm_state_key, id_fsm_state_ver, is_active, id_env_key, id_user_mod_key, dtt_mod, id_event_key, id_fsm_type_key, tx_state_name, tx_state_desc)
VALUES (120006, 0, 1, 100000,  0, GETDATE(), 0, 110016, 'CBO_DEFERRED', '?')

INSERT INTO T_FSM_STATE (id_fsm_state_key, id_fsm_state_ver, is_active, id_env_key, id_user_mod_key, dtt_mod, id_event_key, id_fsm_type_key, tx_state_name, tx_state_desc)
VALUES (120007, 0, 1, 100000,  0, GETDATE(), 0, 110016, 'CBO_RECOMMENDED', '?')

INSERT INTO T_FSM_STATE (id_fsm_state_key, id_fsm_state_ver, is_active, id_env_key, id_user_mod_key, dtt_mod, id_event_key, id_fsm_type_key, tx_state_name, tx_state_desc)
VALUES (120008, 0, 1, 100000,  0, GETDATE(), 0, 110016, 'CBO_RETURNED', '?')

INSERT INTO T_FSM_STATE (id_fsm_state_key, id_fsm_state_ver, is_active, id_env_key, id_user_mod_key, dtt_mod, id_event_key, id_fsm_type_key, tx_state_name, tx_state_desc)
VALUES (120009, 0, 1, 100000,  0, GETDATE(), 0, 110016, 'CEO', '?')

INSERT INTO T_FSM_STATE (id_fsm_state_key, id_fsm_state_ver, is_active, id_env_key, id_user_mod_key, dtt_mod, id_event_key, id_fsm_type_key, tx_state_name, tx_state_desc)
VALUES (120010, 0, 1, 100000,  0, GETDATE(), 0, 110016, 'CRM_APPROVED', '?')

INSERT INTO T_FSM_STATE (id_fsm_state_key, id_fsm_state_ver, is_active, id_env_key, id_user_mod_key, dtt_mod, id_event_key, id_fsm_type_key, tx_state_name, tx_state_desc)
VALUES (120011, 0, 1, 100000,  0, GETDATE(), 0, 110016, 'CRM_C_APPROVED', '?')

INSERT INTO T_FSM_STATE (id_fsm_state_key, id_fsm_state_ver, is_active, id_env_key, id_user_mod_key, dtt_mod, id_event_key, id_fsm_type_key, tx_state_name, tx_state_desc)
VALUES (120012, 0, 1, 100000,  0, GETDATE(), 0, 110016, 'CRM_DECLINED', '?')

INSERT INTO T_FSM_STATE (id_fsm_state_key, id_fsm_state_ver, is_active, id_env_key, id_user_mod_key, dtt_mod, id_event_key, id_fsm_type_key, tx_state_name, tx_state_desc)
VALUES (120013, 0, 1, 100000,  0, GETDATE(), 0, 110016, 'CRM_DEFERRED', '?')

INSERT INTO T_FSM_STATE (id_fsm_state_key, id_fsm_state_ver, is_active, id_env_key, id_user_mod_key, dtt_mod, id_event_key, id_fsm_type_key, tx_state_name, tx_state_desc)
VALUES (120014, 0, 1, 100000,  0, GETDATE(), 0, 110016, 'CRM_RECOMMENDED', '?')

INSERT INTO T_FSM_STATE (id_fsm_state_key, id_fsm_state_ver, is_active, id_env_key, id_user_mod_key, dtt_mod, id_event_key, id_fsm_type_key, tx_state_name, tx_state_desc)
VALUES (120015, 0, 1, 100000,  0, GETDATE(), 0, 110016, 'CRM_RETURNED', '?')

INSERT INTO T_FSM_STATE (id_fsm_state_key, id_fsm_state_ver, is_active, id_env_key, id_user_mod_key, dtt_mod, id_event_key, id_fsm_type_key, tx_state_name, tx_state_desc)
VALUES (120016, 0, 1, 100000,  0, GETDATE(), 0, 110016, 'DELETED', '?')

INSERT INTO T_FSM_STATE (id_fsm_state_key, id_fsm_state_ver, is_active, id_env_key, id_user_mod_key, dtt_mod, id_event_key, id_fsm_type_key, tx_state_name, tx_state_desc)
VALUES (120017, 0, 1, 100000,  0, GETDATE(), 0, 110016, 'MD_APPROVED', '?')

INSERT INTO T_FSM_STATE (id_fsm_state_key, id_fsm_state_ver, is_active, id_env_key, id_user_mod_key, dtt_mod, id_event_key, id_fsm_type_key, tx_state_name, tx_state_desc)
VALUES (120018, 0, 1, 100000,  0, GETDATE(), 0, 110016, 'MD_C_APPROVED', '?')

INSERT INTO T_FSM_STATE (id_fsm_state_key, id_fsm_state_ver, is_active, id_env_key, id_user_mod_key, dtt_mod, id_event_key, id_fsm_type_key, tx_state_name, tx_state_desc)
VALUES (120019, 0, 1, 100000,  0, GETDATE(), 0, 110016, 'MD_DECLINED', '?')

INSERT INTO T_FSM_STATE (id_fsm_state_key, id_fsm_state_ver, is_active, id_env_key, id_user_mod_key, dtt_mod, id_event_key, id_fsm_type_key, tx_state_name, tx_state_desc)
VALUES (120020, 0, 1, 100000,  0, GETDATE(), 0, 110016, 'MD_DEFERRED', '?')

INSERT INTO T_FSM_STATE (id_fsm_state_key, id_fsm_state_ver, is_active, id_env_key, id_user_mod_key, dtt_mod, id_event_key, id_fsm_type_key, tx_state_name, tx_state_desc)
VALUES (120021, 0, 1, 100000,  0, GETDATE(), 0, 110016, 'MD_RECOMMENDED', '?')

INSERT INTO T_FSM_STATE (id_fsm_state_key, id_fsm_state_ver, is_active, id_env_key, id_user_mod_key, dtt_mod, id_event_key, id_fsm_type_key, tx_state_name, tx_state_desc)
VALUES (120022, 0, 1, 100000,  0, GETDATE(), 0, 110016, 'MD_RETURNED', '?')

INSERT INTO T_FSM_STATE (id_fsm_state_key, id_fsm_state_ver, is_active, id_env_key, id_user_mod_key, dtt_mod, id_event_key, id_fsm_type_key, tx_state_name, tx_state_desc)
VALUES (120023, 0, 1, 100000,  0, GETDATE(), 0, 110016, 'MIS_UPDATED', '?')

INSERT INTO T_FSM_STATE (id_fsm_state_key, id_fsm_state_ver, is_active, id_env_key, id_user_mod_key, dtt_mod, id_event_key, id_fsm_type_key, tx_state_name, tx_state_desc)
VALUES (120024, 0, 1, 100000,  0, GETDATE(), 0, 110016, 'NEW', '?')

INSERT INTO T_FSM_STATE (id_fsm_state_key, id_fsm_state_ver, is_active, id_env_key, id_user_mod_key, dtt_mod, id_event_key, id_fsm_type_key, tx_state_name, tx_state_desc)
VALUES (120025, 0, 1, 100000,  0, GETDATE(), 0, 110016, 'ON_PROCESSED', '?')

INSERT INTO T_FSM_STATE (id_fsm_state_key, id_fsm_state_ver, is_active, id_env_key, id_user_mod_key, dtt_mod, id_event_key, id_fsm_type_key, tx_state_name, tx_state_desc)
VALUES (120026, 0, 1, 100000,  0, GETDATE(), 0, 110016, 'PC _RETURNED', '?')

INSERT INTO T_FSM_STATE (id_fsm_state_key, id_fsm_state_ver, is_active, id_env_key, id_user_mod_key, dtt_mod, id_event_key, id_fsm_type_key, tx_state_name, tx_state_desc)
VALUES (120027, 0, 1, 100000,  0, GETDATE(), 0, 110016, 'PEND_MOD', '?')

INSERT INTO T_FSM_STATE (id_fsm_state_key, id_fsm_state_ver, is_active, id_env_key, id_user_mod_key, dtt_mod, id_event_key, id_fsm_type_key, tx_state_name, tx_state_desc)
VALUES (120028, 0, 1, 100000,  0, GETDATE(), 0, 110016, 'PEND_RECEIVED', '?')

INSERT INTO T_FSM_STATE (id_fsm_state_key, id_fsm_state_ver, is_active, id_env_key, id_user_mod_key, dtt_mod, id_event_key, id_fsm_type_key, tx_state_name, tx_state_desc)
VALUES (120030, 0, 1, 100000,  0, GETDATE(), 0, 110016, 'RECEIVED', '?')

INSERT INTO T_FSM_STATE (id_fsm_state_key, id_fsm_state_ver, is_active, id_env_key, id_user_mod_key, dtt_mod, id_event_key, id_fsm_type_key, tx_state_name, tx_state_desc)
VALUES (120031, 0, 1, 100000,  0, GETDATE(), 0, 110016, 'RM_RECOMMENDED', '?')

INSERT INTO T_FSM_STATE (id_fsm_state_key, id_fsm_state_ver, is_active, id_env_key, id_user_mod_key, dtt_mod, id_event_key, id_fsm_type_key, tx_state_name, tx_state_desc)
VALUES (120032, 0, 1, 100000,  0, GETDATE(), 0, 110016, 'RM_RETURNED', '?')

INSERT INTO T_FSM_STATE (id_fsm_state_key, id_fsm_state_ver, is_active, id_env_key, id_user_mod_key, dtt_mod, id_event_key, id_fsm_type_key, tx_state_name, tx_state_desc)
VALUES (120033, 0, 1, 100000,  0, GETDATE(), 0, 110016, 'RM_SENT_QUERY', '?')

INSERT INTO T_FSM_STATE (id_fsm_state_key, id_fsm_state_ver, is_active, id_env_key, id_user_mod_key, dtt_mod, id_event_key, id_fsm_type_key, tx_state_name, tx_state_desc)
VALUES (120034, 0, 1, 100000,  0, GETDATE(), 0, 110016, 'RM_UPDATED', '?')

INSERT INTO T_FSM_STATE (id_fsm_state_key, id_fsm_state_ver, is_active, id_env_key, id_user_mod_key, dtt_mod, id_event_key, id_fsm_type_key, tx_state_name, tx_state_desc)
VALUES (120035, 0, 1, 100000,  0, GETDATE(), 0, 110016, 'SO_RE_RECOMMENDED', '?')

INSERT INTO T_FSM_STATE (id_fsm_state_key, id_fsm_state_ver, is_active, id_env_key, id_user_mod_key, dtt_mod, id_event_key, id_fsm_type_key, tx_state_name, tx_state_desc)
VALUES (120036, 0, 1, 100000,  0, GETDATE(), 0, 110016, 'SO_RECOMMENDED', '?')

INSERT INTO T_FSM_STATE (id_fsm_state_key, id_fsm_state_ver, is_active, id_env_key, id_user_mod_key, dtt_mod, id_event_key, id_fsm_type_key, tx_state_name, tx_state_desc)
VALUES (120037, 0, 1, 100000,  0, GETDATE(), 0, 110016, 'UH_APPROVED', '?')

INSERT INTO T_FSM_STATE (id_fsm_state_key, id_fsm_state_ver, is_active, id_env_key, id_user_mod_key, dtt_mod, id_event_key, id_fsm_type_key, tx_state_name, tx_state_desc)
VALUES (120038, 0, 1, 100000,  0, GETDATE(), 0, 110016, 'UH_C_APPROVED', '?')

INSERT INTO T_FSM_STATE (id_fsm_state_key, id_fsm_state_ver, is_active, id_env_key, id_user_mod_key, dtt_mod, id_event_key, id_fsm_type_key, tx_state_name, tx_state_desc)
VALUES (120039, 0, 1, 100000,  0, GETDATE(), 0, 110016, 'UH_DECLINED', '?')

INSERT INTO T_FSM_STATE (id_fsm_state_key, id_fsm_state_ver, is_active, id_env_key, id_user_mod_key, dtt_mod, id_event_key, id_fsm_type_key, tx_state_name, tx_state_desc)
VALUES (120040, 0, 1, 100000,  0, GETDATE(), 0, 110016, 'UH_DEFERRED', '?')

INSERT INTO T_FSM_STATE (id_fsm_state_key, id_fsm_state_ver, is_active, id_env_key, id_user_mod_key, dtt_mod, id_event_key, id_fsm_type_key, tx_state_name, tx_state_desc)
VALUES (120041, 0, 1, 100000,  0, GETDATE(), 0, 110016, 'UH_RECOMMENDED', '?')

INSERT INTO T_FSM_STATE (id_fsm_state_key, id_fsm_state_ver, is_active, id_env_key, id_user_mod_key, dtt_mod, id_event_key, id_fsm_type_key, tx_state_name, tx_state_desc)
VALUES (120042, 0, 1, 100000,  0, GETDATE(), 0, 110016, 'UH_RETURNED', '?')
