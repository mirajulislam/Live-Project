/* __CC_INFO__  : */
/******************************************************************************
* File Name   : nSMART_GeneralSQL.h
* Description : GeneralSQL Header File
* Author      : Naz Ahmed
******************************************************************************/

#ifndef NSMART_GENERAL_SQL_H
#define NSMART_GENERAL_SQL_H	{};


#define _SYSTEM_NSMART						{'nSMART'};
#define _SYSTEM_PAS							{'PAS'};
#define _SYSTEM_PAS_MANUAL					{'P-MANUAL'};
#define _SYSTEM_JSHEET						{'JSHEET'};
#define _SYSTEM_FUTURES						{'FUTURES'};
#define _SYSTEM_SWIFT						{'SWIFT'};
#define _SYSTEM_OFAC						{'OFAC'};
#define _SYSTEM_BSA							{'BSA'};
#define _SYSTEM_DTC							{'DTC'};
#define _SYSTEM_FED							{'FED'};
#define _SYSTEM_MANUAL						{'MANUAL'};


#define _LEGAL_ENTITY_ALIAS_AMG				{'AMG'};
#define _LEGAL_ENTITY_ALIAS_FSAPAL			{'FSAPAL'};

#define _PAYMENT_DIRECTION_OUTBOUND			{1};
#define _PAYMENT_DIRECTION_INBOUND			{0};

#define _STATUS_NETTED						{'NETTED'};

#define _PAYMENT_STATE_APPROVED				{'APPROVED'};
#define _PAYMENT_STATE_SYS_AUTO_APPROVED	{'AUTO_APPROVED'};
#define _PAYMENT_STATE_AUTHORIZED			{'AUTHORIZED'};
#define _PAYMENT_STATE_PEND_AUTHORIZE		{'PEND_AUTHORIZE'};
#define _PAYMENT_STATE_OFAC_OK				{'OFAC_ACK'};
#define _PAYMENT_STATE_SWIFT_PENDING_ACK	{'SWIFT_PEND_ACK'};
#define _PAYMENT_STATE_SWIFT_ACK			{'SWIFT_ACK'};
#define _PAYMENT_STATE_SWIFT_NACK			{'SWIFT_NACK'};
#define _PAYMENT_STATE_BONY_ACK				{'BONY_ACK'};
#define _PAYMENT_STATE_BONY_NACK			{'BONY_NACK'};
#define _PAYMENT_STATE_BONY_PENDING_ACK		{'BONY_PEND_ACK'};
#define _PAYMENT_STATE_OFAC_HIT				{'OFAC_HIT'};
#define _PAYMENT_STATE_OFAC_BAD				{'OFAC_BAD'};
#define _PAYMENT_STATE_CONFIRMED			{'CONFIRMED'};
#define _PAYMENT_STATE_DELETED				{'DELETED'};

#define _PAYMENT_STATE_UNMATCHED_EXPECTED	{'UNMATCHED_EXPECTED'};
#define _PAYMENT_STATE_UNMATCHED_ACTUAL		{'UNMATCHED_ACTUAL'};

#define _PAYMENT_ROUTE_INBOUND				{'INBOUND'};
#define _PAYMENT_ROUTE_OUTBOUND				{'OUTBOUND'};

#define _DEXIA_REF_DEX_LIQ					{'DEX-LIQ-'};
#define _DEXIA_REF_FUT401					{'FUT401'};
#define _DEXIA_REF_COLL						{'COLL-'};

#define _BANK_ACCOUNT_ALIAS_FSA				{'FSA'};
#define _BANK_ACCOUNT_ALIAS_FAC			    {'FAC'};
#define _BANK_ACCOUNT_ALIAS_TEST			{'TEST'};
#define _EMAIL_INTERVAL						{'EMAIL_INTERVAL'};

#define _STATUS_PENDING						{'PENDING'};
#define _STATUS_PROCESSED					{'PROCESSED'};
#define _NOFAC_HIT 							{'HIT'};



#define _GET_ENVIRONMENT()
{
	_GET_ENVIRONMENT(@id_env_key, @g_tx_env_name, @id_user_mod_key)
};

#define _GET_ENVIRONMENT(_env_id_, _env_name_, _user_key_)
{
	IF (_IS_NULL_INT(_env_id_) AND @tx_action_name != _ACTION_LOGIN)
	{
		EXEC @g_id_return_status = GET_environment @id_env_key = _env_id_ OUTPUT, @tx_env_name	= _env_name_ OUTPUT, @id_user_key = _user_key_

		SELECT @g_tx_err_msg = _GEM_CALL_SP(GET_ENVIRONMENT)
		_RETURN_IF_ERROR(@g_id_return_status, _GEC_CALL_SP, @g_tx_err_msg)
	}

	SELECT @g_id_env_key = _env_id_
};



#define _GET_DEFAULT_LEGAL_ENTITY(_legal_entity_key_, _legal_entity_alias_, _legal_entity_name_)
{

	IF (  _IS_NULL_INT(_legal_entity_key_) AND  _IS_NULL_STR(_legal_entity_alias_) AND  _IS_NULL_STR(_legal_entity_name_) )
	{
		-- GET DEFAULT ENTITY
		SELECT	_legal_entity_alias_ = ISNULL(P.tx_pref_val, _DB_NULL_STR)
		FROM	T_PREFERENCE	P
		WHERE	P.tx_pref_type	= _PREF_TYPE_SYS_GLOBAL
		AND		P.tx_pref_name	= _PREF_NAME_DEFAULT_LEGAL_ENTITY_ALIAS
		AND		_SEL_CLAUSE(P)

		SELECT @g_tx_log_msg = 'Defaulted LEGAL ENTITY to ' + _legal_entity_alias_
		_LOG_INFO(_GEC_SELECT, @g_tx_log_msg)

	}

	-- RESOLVE LEGAL ENTITY
	_GET_LEGAL_ENTITY(_legal_entity_key_, _legal_entity_alias_, _legal_entity_name_)
};



#define _GET_LEGAL_ENTITY(_legal_entity_key_, _legal_entity_alias_, _legal_entity_name_)
 {

	IF (  _IS_NULL_INT(_legal_entity_key_) AND  _IS_NULL_STR(_legal_entity_alias_) AND  _IS_NULL_STR(_legal_entity_name_) )
	{
		SELECT @g_tx_err_msg = 'Must pass in either legal entity id, legal entity alias or legal entity name'
		_HANDLE_ERROR(@g_tx_err_msg)
	}
	ELSE
	{
		SELECT	  _legal_entity_key_		= LE.id_legal_entity_key
				, _legal_entity_alias_		= LE.tx_legal_entity_alias
				, _legal_entity_name_		= LE.tx_legal_entity_name
		FROM	T_LEGAL_ENTITY	LE
		WHERE	id_legal_entity_key		= ISNULL(_legal_entity_key_		, LE.id_legal_entity_key)
		AND		tx_legal_entity_alias	= ISNULL(_legal_entity_alias_	, LE.tx_legal_entity_alias)
		AND		tx_legal_entity_name	= ISNULL(_legal_entity_name_	, LE.tx_legal_entity_name)
		AND		_SEL_CLAUSE(LE)

		_STORE_SYS_VARS
		_HANDLE_ZERO_ROW_COUNT(_GEC_SELECT, 'Error resolving LEGAL ENTITY')
	}
};


#define _GET_FILE(_file_key_, _file_id_)
 {

	IF (  _IS_NULL_INT(_file_key_) AND  _IS_NULL_STR(_file_id_) )
	{
		SELECT @g_tx_err_msg = 'Must pass in either file key, or file id'
		_HANDLE_ERROR(@g_tx_err_msg)
	}
	ELSE
	{
		SELECT	  _file_key_	= F.id_file_key
				, _file_id_		= F.tx_file_id
		FROM	T_FILE_INFO	F
		WHERE	id_file_key		= ISNULL(_file_key_	, F.id_file_key)
		AND		tx_file_id		= ISNULL(_file_id_	, F.tx_file_id)
		AND		_SEL_CLAUSE(F)

		_STORE_SYS_VARS
		_HANDLE_ZERO_ROW_COUNT(_GEC_SELECT, 'Error resolving FILE ID')
	}
};


#define _GET_REPORT_FILE(_file_key_, _file_id_)
 {

	IF (  _IS_NULL_INT(_file_key_) AND  _IS_NULL_STR(_file_id_) )
	{
		SELECT @g_tx_err_msg = 'Must pass in either file key, or file id'
		_HANDLE_ERROR(@g_tx_err_msg)
	}
	ELSE
	{
		SELECT	  _file_key_	= F.id_report_key
				, _file_id_		= F.tx_file_id
		FROM	T_REPORT_INFO	F
		WHERE	id_report_key	= ISNULL(_file_key_	, F.id_report_key)
		AND		tx_file_id		= ISNULL(_file_id_	, F.tx_file_id)
		AND		_SEL_CLAUSE(F)

		_STORE_SYS_VARS
		_HANDLE_ZERO_ROW_COUNT(_GEC_SELECT, 'Error resolving FILE ID')
	}
};

#define _GET_CORPORATION_INFO(_state_key_, _state_name_, _temp_ver_, _party_name_, _party_key_, _msg_string_)
 {

	SELECT	  _state_key_				= T.id_state_key
			, _state_name_				= S.tx_state_name
			, _temp_ver_				= T.id_version
			, _party_name_				= T.tx_corp_short_name
	FROM	REF.T_CORPORATION			T
	JOIN	T_FSM_STATE					S	ON S.id_fsm_state_key = T.id_state_key
	WHERE	T.id_corp_key				= _party_key_
	AND		T.is_active					= _TRUE

	IF(_state_name_ = _FSM_STATE_APPROVED)
	{
		SELECT @g_tx_err_msg = 'The current version of the ' + _msg_string_ + ' party is approved [' + _TO_DB_STR(_party_name_) +'] Version, [' +  _TO_DB_STR(_temp_ver_)	+ '] '
		_LOG_INFO(_GEC_SELECT, @g_tx_err_msg)
	}
	ELSE
	{
		SELECT @g_tx_err_msg = 'The current version of the ' + _msg_string_ + ' party is not approved [' + _TO_DB_STR(_party_name_) +'] Version [' +  _TO_DB_STR(_temp_ver_)	+ '] '
		_HANDLE_ERROR(_GEC_SELECT, @g_tx_err_msg)
	}
};


#define _GET_VALUABLE_INFO(_valuable_key_, _other_type_name_, _state_key_, _state_name_, _temp_ver_, _id_valuable_key_ )
 {

	IF (NOT _IS_NULL_STR(_valuable_key_) AND ( _IS_NULL_STR(_other_type_name_) )) -- (@tx_payment_other_type_name <> _DB_NULL_STR ) )
	{
		SELECT	  _state_key_			= T.id_state_key
				, _state_name_			= S.tx_state_name
				, _temp_ver_			= T.id_version
		FROM	REF.T_VALUABLE			T
		JOIN	T_FSM_STATE				S	ON S.id_fsm_state_key = T.id_state_key
		WHERE	T.id_valuable_key		= _id_valuable_key_
		AND		T.is_active				= 1

		IF(_state_name_ = _FSM_STATE_APPROVED)
		{
			SELECT @g_tx_err_msg = 'The current version of the valuable is approved [' + _TO_DB_STR(_valuable_key_) +'] Version [' + _TO_DB_STR(_temp_ver_)	+ '] '
			_LOG_INFO(_GEC_SELECT, @g_tx_err_msg)
		}
		ELSE
		{
			SELECT @g_tx_err_msg = 'The current version of the valuable is not approved [' + _TO_DB_STR(_valuable_key_) +'] Version [' +  _TO_DB_STR(_temp_ver_)	+ '] '
			_HANDLE_ERROR(_GEC_SELECT, @g_tx_err_msg)
		}
	}
};


#endif
