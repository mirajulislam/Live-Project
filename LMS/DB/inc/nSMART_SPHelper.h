/* __CC_INFO__  : */
/******************************************************************************
* File Name   : nSMART_GeneralSQL.h
* Description : GeneralSQL Header File
* Author      : Naz Ahmed
******************************************************************************/

#ifndef NSMART_SP_HELPER_H
#define NSMART_SP_HELPER_H	{};


#define _NSMART_SP_SEL_HEADER()
{
	_NSMART_SP_SEL_HEADER(_SP_NAME)
};


#define _NSMART_SP_SEL_HEADER(_sp_name_)
{
	_SP_SEL_HEADER(_sp_name_)
	
	DECLARE @l_dt_today	date
	SELECT	@l_dt_today = GETDATE()
};

#define _GET_LEGAL_ENTITY_NAME_FROM_KEY(_legal_entity_key_, _legal_entity_name_)
{
	IF ( _IS_NULL_INT(_legal_entity_key_) AND _IS_NULL_STR(_legal_entity_name_) )
	{
		SELECT @g_tx_err_msg = 'Must pass in either @id_legal_entity_key or @tx_legal_entity_name'
		_HANDLE_ERROR(_GEC_ACTION, @g_tx_err_msg)
	}
	ELSE
	{
		SELECT	_legal_entity_key_	= id_legal_entity_key
			  ,	_legal_entity_name_	= tx_legal_entity_name		
		FROM	T_LEGAL_ENTITY
		WHERE	tx_legal_entity_name	= ISNULL(_legal_entity_name_	, tx_legal_entity_name)
		AND		id_legal_entity_key		= ISNULL(_legal_entity_key_		, id_legal_entity_key)	
		AND		_SEL_CLAUSE

		_STORE_SYS_VARS
		SELECT @g_tx_err_msg = _GEM_SELECT(T_LEGAL_ENTITY, _legal_entity_name_)
		_HANDLE_ZERO_ROW_COUNT(_GEC_INSERT, @g_tx_err_msg)
	}
};

#endif
