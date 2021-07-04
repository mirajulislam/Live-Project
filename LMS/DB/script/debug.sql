
-- to get all state for a role
select R.tx_role_name, ST.tx_state_name
from T_ROLE_STATE_MAP rs
join T_ROLE r on rs.id_role_key = r.id_role_key
join T_FSM_STATE st on rs.id_fsm_state_key = st.id_fsm_state_key
join T_FSM_TYPE t on st.id_fsm_type_key = t.id_fsm_type_key and t.tx_fsm_type_name = 'LOAN'
WHERE R.tx_role_name  = 'MIS'

--loan and state
select s.tx_state_name,L.dtt_create,l.dtt_mod, u.tx_login_name, g.tx_legal_entity_name, L.*
from T_LOAN_AUDIT L
join T_FSM_STATE s on s.id_fsm_state_key = L.id_state_key
join T_FSM_TYPE t on t.id_fsm_type_key = s.id_fsm_type_key
join T_USER u on l.id_user_mod_key = u.id_user_key
left join T_LEGAL_ENTITY g on l.id_legal_entity_key = g.id_legal_entity_key
where tx_loan_tracking_id in(
'107762'
)


select L.id_legal_entity_key, L.id_creator_key , S.tx_state_name, L.is_active
from T_LOAN L
JOIN T_FSM_STATE S ON S.id_fsm_state_key = L.id_state_key
where id_legal_entity_key < 0

SELECT L.id_legal_entity_key, L.id_creator_key, LE.id_legal_entity_key 
FROM T_LOAN L
JOIN T_USER U ON U.id_user_key = L.id_creator_key
JOIN T_LEGAL_ENTITY LE ON LE.id_legal_entity_key = U.id_legal_entity_key
where L.tx_loan_tracking_id IN( '106701', '106704')


/*FOR MIS USER MAIN GRID DATA LOAN*/

ACT_loan @tx_action_name = 'SELECT_LOAN_FOR_GRID' 
, @id_user_mod_key = 110938
, @tx_from_date = '2020-08-16'
, @tx_to_date = '2020-09-15'



/*FOR SOURCE_OFFICER USER LOAN DETAILS DATA LOAD*/
ACT_loan @tx_action_name = 'SELECT_FULL_LOAN' 
, @id_user_mod_key = 110934 
, @id_loan_key = 101453 
, @tx_account_no = '0010179873201'


/*FOR RISK_MANAGER USER LOAN GROUP GRID DATA LOAN*/
ACT_loan @tx_action_name = 'SELECT_ALL_LOAN_GROUP_DATA' 
, @id_user_mod_key = 110939 
, @tx_from_date = '2020-08-15'
, @tx_to_date = '2020-09-14'

/*FOR CREDIT_ANALYST, RISK_MANAGER, UNIT_HEAD, HoCRM USER SELECT FOR ADD TO LOAN GROUP GRID DATA LOAN*/
ACT_loan @tx_action_name = 'SELECT_FOR_ADD_TO_LOAN_GROUP' 
, @id_user_mod_key = 110939 
, @tx_from_date = '2020-08-15'
, @tx_to_date = '2020-09-22'



/*FOR RISK_MANAGER USER CREATING LOAN GROUP*/
ACT_loan @tx_action_name = 'CREATE_LOAN_GROUP' 
, @id_user_mod_key=110939
, @id_loan_key=101471
, @tx_loan_group_id=2009160044