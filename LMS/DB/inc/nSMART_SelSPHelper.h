/* __CC_INFO__  :  */
/******************************************************************************
* File Name   : SEL_corp.h
* Description : SEL_Corp helper File
* Author      : Naz Ahmed
* Date        : 18 June 2011
* Copyright	  : nazdaqTechnologies Inc.,
******************************************************************************/

#ifndef SEL_CORP_H
#define SEL_CORP_H {};


#define _CORP_WHERE_CLAUSE(_t1_)
{
			_t1_.id_corp_key			= ISNULL(@id_corp_key			, _t1_.id_corp_key)
	AND		_t1_.id_parent_corp_key		= ISNULL(@id_parent_corp_key	, _t1_.id_parent_corp_key)
	AND		_t1_.tx_corp_legal_name		= ISNULL(@tx_corp_legal_name	, _t1_.tx_corp_legal_name)
	AND		_t1_.tx_corp_short_name		= ISNULL(@tx_corp_short_name	, _t1_.tx_corp_short_name)
	AND		_t1_.tx_corp_notes			= ISNULL(@tx_corp_notes			, _t1_.tx_corp_notes)
	AND		_t1_.dtt_mod				>= ISNULL(@dtt_last_refresh		, _DB_NULL_DATE)
	AND		_SEL_CLAUSE(_t1_)
};

#define X_CONTACT_ADDRESS_WHERE_CLAUSE(_t1_)
{
			id_contact_address_key	= ISNULL(@id_contact_address_key	, id_contact_address_key)
	AND		tx_address_1			= ISNULL(@tx_address_1				, tx_address_1)
	AND		tx_address_2			= ISNULL(@tx_address_2				, tx_address_2)
	AND		tx_city					= ISNULL(@tx_city					, tx_city)
	AND		tx_state				= ISNULL(@tx_state					, tx_state)
	AND		tx_zip					= ISNULL(@tx_zip					, tx_zip)
	AND		id_country_key			= ISNULL(@id_country_key			, id_country_key)
	AND		id_key					= ISNULL(@id_key					, id_key)
	AND		id_type_key				= ISNULL(@id_type_key				, id_type_key)	
	AND		ct_sort_order			= ISNULL(@ct_sort_order				, ct_sort_order)
	AND		is_primary				= ISNULL(@is_primary				, is_primary)
	AND		_SEL_CLAUSE(_t1_)
};

#define X_CONTACT_MISC_WHERE_CLAUSE(_t1_)
{
			id_contact_misc_key			= ISNULL(@id_contact_misc_key			, id_contact_misc_key)
	AND		id_contact_misc_type_key	= ISNULL(@id_contact_misc_type_key		, id_contact_misc_type_key)
	AND		tx_contact_misc_value		= ISNULL(@tx_contact_misc_value			, tx_contact_misc_value)
	AND		tx_contact_desc				= ISNULL(@tx_contact_desc				, tx_contact_desc)	
	AND		id_key						= ISNULL(@id_key						, id_key)				
--	AND		id_type_key					= ISNULL(@id_type_key					, id_type_key)	--TODO_H: check the query uncommenting this.
	AND		is_primary					= ISNULL(@is_primary					, is_primary)	
	AND		ct_sort_order				= ISNULL(@ct_sort_order					, ct_sort_order)
	AND		_SEL_CLAUSE(_t1_)
};


#define _PERSON_WHERE_CLAUSE(_t1_)
{
			_t1_.id_person_key			= ISNULL(@id_person_key			, _t1_.id_person_key)
	AND		_t1_.id_corp_key			= ISNULL(@id_corp_key			, _t1_.id_corp_key) 
	AND		_t1_.tx_corp_position		= ISNULL(@tx_corp_position		, _t1_.tx_corp_position)
	AND		_t1_.tx_corp_department		= ISNULL(@tx_corp_department	, _t1_.tx_corp_department)
	AND		_t1_.tx_title				= ISNULL(@tx_title				, _t1_.tx_title)
	AND		_t1_.tx_first_name			= ISNULL(@tx_first_name			, _t1_.tx_first_name)
	AND		_t1_.tx_last_name			= ISNULL(@tx_last_name			, _t1_.tx_last_name)
	AND		_t1_.tx_user_alias			= ISNULL(@tx_user_alias			, _t1_.tx_user_alias)
	AND		_t1_.dtt_mod			   >= ISNULL(@dtt_last_refresh		, _DB_NULL_DATE)
	AND		_t1_.tx_notes				= ISNULL(@tx_notes				, _t1_.tx_notes)
	AND		_SEL_CLAUSE(_t1_)
};


#define _PSSI_MT_WHERE_CLAUSE(_tbl_ssi_)
{
			_tbl_ssi_.id_payment_ssi_mt_key		= ISNULL(@id_payment_ssi_mt_key		, _tbl_ssi_.id_payment_ssi_mt_key)
	AND		_tbl_ssi_.id_payment_key			= ISNULL(@id_payment_key			, _tbl_ssi_.id_payment_key)
	AND		_tbl_ssi_.id_ssi_tmplt_mt_key		= ISNULL(@id_ssi_tmplt_mt_key		, _tbl_ssi_.id_ssi_tmplt_mt_key)
	AND		_tbl_ssi_.id_swift_model_mt_key		= ISNULL(@id_swift_model_mt_key		, _tbl_ssi_.id_swift_model_mt_key)
	AND		_tbl_ssi_.id_ssi_tmplt_mt_ver		= ISNULL(@id_ssi_tmplt_mt_ver		, _tbl_ssi_.id_ssi_tmplt_mt_ver)
	AND		_tbl_ssi_.tx_ssi_tmplt_mt_name		= ISNULL(@tx_ssi_tmplt_mt_name		, _tbl_ssi_.tx_ssi_tmplt_mt_name)
	AND		_tbl_ssi_.tx_ssi_notes				= ISNULL(@tx_ssi_notes				, _tbl_ssi_.tx_ssi_notes)
	AND		_tbl_ssi_.tx_desc					= ISNULL(@tx_desc					, _tbl_ssi_.tx_desc)
	AND		_tbl_ssi_.dtt_mod					>= ISNULL(@dtt_last_refresh			, _DB_NULL_DATE)
	AND		_SEL_CLAUSE(_tbl_ssi_)
};


#define _SWIFT_MT_WHERE_CLAUSE(_tbl_mt_)
{
			_tbl_mt_.tx_mt_type					= ISNULL(@tx_mt_type			, _tbl_mt_.tx_mt_type)
	AND		_tbl_mt_.tx_mt_name					= ISNULL(@tx_mt_name			, _tbl_mt_.tx_mt_name)
	AND		_tbl_mt_.tx_mt_direction			= ISNULL(@tx_mt_direction		, _tbl_mt_.tx_mt_direction)
	AND		_SEL_CLAUSE(_tbl_mt_)
};


#define _BANK_ACCOUNT_WHERE_CLAUSE(_table_alias_)
{
			_table_alias_.id_bank_account_key	= ISNULL(@id_bank_account_key	, _table_alias_.id_bank_account_key)
	AND		_table_alias_.tx_account_category	= ISNULL(@tx_account_category	, _table_alias_.tx_account_category)
	AND		_table_alias_.tx_bank_account_alias	= ISNULL(tx_bank_account_alias	, _table_alias_.tx_bank_account_alias)	
	AND		_table_alias_.tx_account_number		= ISNULL(@tx_account_number		, _table_alias_.tx_account_number)		
	AND		_table_alias_.tx_account_name		= ISNULL(@tx_account_name	    , _table_alias_.tx_account_name)	    
	AND		_table_alias_.tx_account_type		= ISNULL(@tx_account_type		, _table_alias_.tx_account_type)		
	AND		_table_alias_.tx_ccy_key			= ISNULL(@tx_ccy_key			, _table_alias_.tx_ccy_key)	
	AND		_table_alias_.id_country_key		= ISNULL(id_country_key			, _table_alias_.id_country_key)
	AND		_table_alias_.tx_desc				= ISNULL(@tx_desc				, _table_alias_.tx_desc)
	AND		_table_alias_.dtt_mod				>= ISNULL(@dtt_last_refresh		, _DB_NULL_DATE)
	AND		_SEL_CLAUSE(_table_alias_)

};

#define _VALUABLE_WHERE_CLAUSE(_table_alias_)
{
    		_table_alias_.id_valuable_key			= ISNULL(@id_valuable_key		, _table_alias_.id_valuable_key)		   
    AND		_table_alias_.id_product_type_key		= ISNULL(@id_product_type_key	, _table_alias_.id_product_type_key)     
    AND		_table_alias_.tx_valuable_name			= ISNULL(@tx_valuable_name		, _table_alias_.tx_valuable_name)			
	AND		_table_alias_.tx_valuable_id			= ISNULL(@tx_valuable_id		, _table_alias_.tx_valuable_id)          
	AND		_table_alias_.dtt_trade					= ISNULL(@dtt_trade				, _table_alias_.dtt_trade)	           
	AND		_table_alias_.dtt_maturity				= ISNULL(@dtt_maturity			, _table_alias_.dtt_maturity)				
	AND		_table_alias_.id_deal_cpty_key			= ISNULL(@id_deal_cpty_key		, _table_alias_.id_deal_cpty_key)		   
	AND		_table_alias_.id_pmnt_cpty_key			= ISNULL(@id_pmnt_cpty_key		, _table_alias_.id_pmnt_cpty_key)
	AND		_table_alias_.tx_valuable_notes			= ISNULL(@tx_valuable_notes		, _table_alias_.tx_valuable_notes)
	AND		_table_alias_.dtt_mod				   >= ISNULL(@dtt_last_refresh		, _DB_NULL_DATE)
    AND		_table_alias_.tx_desc					= ISNULL(@tx_desc				, _table_alias_.tx_desc)
	AND		_SEL_CLAUSE(_table_alias_)

};

#define _VALUABLE_WHERE_GIC_CLAUSE(_table_alias_)
{
    		_table_alias_.id_valuable_key		= ISNULL(@id_valuable_key			, _table_alias_.id_valuable_key)
	AND		_table_alias_.tx_issue					= ISNULL(@tx_issue				, _table_alias_.tx_issue)				
	AND		_table_alias_.id_issuer_key				= ISNULL(@id_issuer_key			, _table_alias_.id_issuer_key)			
	AND		_table_alias_.id_issuing_corp_key		= ISNULL(@id_issuing_corp_key	, _table_alias_.id_issuing_corp_key)	
	AND		_table_alias_.tx_legal_reference		= ISNULL(@tx_legal_reference	, _table_alias_.tx_legal_reference)
	AND		_table_alias_.dtt_mod					>= ISNULL(@dtt_last_refresh		, _DB_NULL_DATE)
};


#define _PAYMENT_WHERE_CLAUSE(_table_alias_)
{
    		_table_alias_.id_payment_key				= ISNULL(@id_payment_key				, _table_alias_.id_payment_key)		       		
	AND		_table_alias_.dt_pay						= ISNULL(@dt_pay						, _table_alias_.dt_pay)	
			
	AND		_table_alias_.tx_pas_valuable_key			= ISNULL(@tx_pas_valuable_key			, _table_alias_.tx_pas_valuable_key)		  
	AND		_table_alias_.tx_paying_party				= ISNULL(@tx_paying_party				, _table_alias_.tx_paying_party)	   
	AND		_table_alias_.tx_receiving_party			= ISNULL(@tx_receiving_party			, _table_alias_.tx_receiving_party)	
	AND		_table_alias_.tx_payment_type_name			= ISNULL(@tx_payment_type_name			, _table_alias_.tx_payment_type_name)
	AND		_table_alias_.tx_product_type				= ISNULL(@tx_product_type				, _table_alias_.tx_product_type)			
	AND		_table_alias_.tx_ccy_key					= ISNULL(@tx_ccy_key					, _table_alias_.tx_ccy_key)	

	AND		_table_alias_.dtt_mod						>= ISNULL(@dtt_last_refresh				, _DB_NULL_DATE)
    AND		_table_alias_.dec_payment_expected_amount	= ISNULL(dec_payment_expected_amount	, _table_alias_.dec_payment_expected_amount)		
	AND		_table_alias_.tx_cusip						= ISNULL(@tx_cusip						, _table_alias_.tx_cusip)				
 
	-- nSMART Resolved keys	
	AND		_table_alias_.id_source_system_key			= ISNULL(@id_source_system_key			, _table_alias_.id_source_system_key)
	AND		_table_alias_.id_valuable_key				= ISNULL(@id_valuable_key				, _table_alias_.id_valuable_key)
	AND		_table_alias_.id_product_type_key			= ISNULL(@id_product_type_key			, _table_alias_.id_product_type_key)
	AND		_table_alias_.id_payment_type_key			= ISNULL(@id_payment_type_key			, _table_alias_.id_payment_type_key)   
	AND		_table_alias_.id_paying_party_key			= ISNULL(@id_paying_party_key			, _table_alias_.id_paying_party_key)       
	AND		_table_alias_.id_receiving_party_key		= ISNULL(@id_receiving_party_key		, _table_alias_.id_receiving_party_key)  
	
	AND		_table_alias_.tx_desc						= ISNULL(@tx_desc						, _table_alias_.tx_desc)	
	AND		_table_alias_.tx_payment_notes				= ISNULL(@tx_payment_notes				, _table_alias_.tx_payment_notes)			
    
	AND		_table_alias_.is_payment_included			= ISNULL(@is_payment_included			, _table_alias_.is_payment_included)		
  --AND		_table_alias_.is_user_created				= ISNULL(@is_user_created				, _table_alias_.is_user_created)		
	AND		_table_alias_.dtt_created					= ISNULL(@dtt_created					, _table_alias_.dtt_created)	
	AND		_table_alias_.dtt_approved					= ISNULL(@dtt_approved					, _table_alias_.dtt_approved)
	AND		_table_alias_.dtt_authorized				= ISNULL(@dtt_authorized				, _table_alias_.dtt_authorized)	

	AND		_table_alias_.tx_internal_reference			= ISNULL(@tx_internal_reference			, _table_alias_.tx_internal_reference)	
	AND		_table_alias_.id_payment_other_type_key		= ISNULL(id_payment_other_type_key		, _table_alias_.id_payment_other_type_key)	      			
  --AND		_table_alias_.tx_payment_other_type_desc	= ISNULL(tx_payment_other_type_desc		, _table_alias_.tx_payment_other_type_desc)


	AND		_SEL_CLAUSE(_table_alias_)

};


#define _PAYMENT_SOURCE_WHERE_CLAUSE(_table_alias_)
{
    		_table_alias_.id_source_payment_key		= ISNULL(@id_source_payment_key		, _table_alias_.id_source_payment_key)		       
    AND		_table_alias_.dtt_run					= ISNULL(@dtt_run					, _table_alias_.dtt_run)			
	AND		_table_alias_.dt_pay					= ISNULL(@dt_pay					, _table_alias_.dt_pay)			    
	AND		_table_alias_.tx_pas_valuable_key		= ISNULL(@tx_pas_valuable_key		, _table_alias_.tx_pas_valuable_key)		  
	AND		_table_alias_.tx_paying_party			= ISNULL(@tx_paying_party			, _table_alias_.tx_paying_party)	   
	AND		_table_alias_.tx_receiving_party		= ISNULL(@tx_receiving_party		, _table_alias_.tx_receiving_party)	
	AND		_table_alias_.tx_payment_type_name		= ISNULL(@tx_payment_type_name		, _table_alias_.tx_payment_type_name)
	AND		_table_alias_.tx_product_type			= ISNULL(@tx_product_type			, _table_alias_.tx_product_type)			
	AND		_table_alias_.tx_ccy_key				= ISNULL(@tx_ccy_key				, _table_alias_.tx_ccy_key)			
	AND		_table_alias_.dtt_mod				   >= ISNULL(@dtt_last_refresh			, _DB_NULL_DATE)
    AND		_table_alias_.dec_payment_amount		= ISNULL(@dec_payment_amount		, _table_alias_.dec_payment_amount)		
	AND		_table_alias_.tx_cusip					= ISNULL(@tx_cusip					, _table_alias_.tx_cusip)				
	AND		_table_alias_.tx_desc					= ISNULL(@tx_desc					, _table_alias_.tx_desc)
	-- nSMART Resolved keys	
	AND		_table_alias_.id_source_system_key		= ISNULL(@id_source_system_key		, _table_alias_.id_source_system_key)
	AND		_table_alias_.id_valuable_key			= ISNULL(@id_valuable_key			, _table_alias_.id_valuable_key)
	AND		_table_alias_.id_product_type_key		= ISNULL(@id_product_type_key		, _table_alias_.id_product_type_key)
	AND		_table_alias_.id_payment_type_key		= ISNULL(@id_payment_type_key		, _table_alias_.id_payment_type_key)   
	AND		_table_alias_.id_paying_party_key		= ISNULL(@id_paying_party_key		, _table_alias_.id_paying_party_key)       
	AND		_table_alias_.id_receiving_party_key	= ISNULL(@id_receiving_party_key	, _table_alias_.id_receiving_party_key)    
	AND		_SEL_CLAUSE(_table_alias_)

};

/* TODO_H: Discuss this with Naz vai....*/
#define _SSI_TEMPLATE_WHERE_CLAUSE(_table_alias_)
{

	AND		_SEL_CLAUSE(_table_alias_)
};

#define X_XXX_WHERE_CLAUSE(_table_alias_)
{
			id_user_key		= ISNULL(@id_user_key		, id_user_key)          
	AND		tx_first_name	= ISNULL(@tx_first_name		, tx_first_name)    
	AND		tx_last_name	= ISNULL(@tx_last_name		, tx_last_name)     
	AND		tx_login_name	= ISNULL(@tx_login_name		, tx_login_name)    
	AND		tx_password		= ISNULL(@tx_password		, tx_password)      
	AND		tx_user_alias	= ISNULL(@tx_user_alias		, tx_user_alias)
	AND		_SEL_CLAUSE(_table_alias_)
};



#define _USER_WHERE_CLAUSE(_tbl_usr_, _tbl_grp_, _tbl_le_, _tbl_env_) 
{
			_USER_WHERE_CLAUSE(_tbl_usr_)
	AND		_tbl_grp_.tx_group_name			= ISNULL(@tx_group_name			, _tbl_grp_.tx_group_name)
	AND		_tbl_le_.id_legal_entity_key	= ISNULL(@id_legal_entity_key	, _tbl_le_.id_legal_entity_key)
	AND		_tbl_le_.tx_legal_entity_name	= ISNULL(@tx_legal_entity_name	, _tbl_le_.tx_legal_entity_name)
	AND		_SEL_CLAUSE(_tbl_grp_)
	AND		_SEL_CLAUSE(_tbl_le_)
	AND		_SEL_CLAUSE(_tbl_env_)
};

#define _USER_WHERE_CLAUSE(_tbl_usr_)
{
			_tbl_usr_.id_user_key			= ISNULL(@id_user_key			, _tbl_usr_.id_user_key)
	AND		_tbl_usr_.id_legal_entity_key	= ISNULL(@id_legal_entity_key	, _tbl_usr_.id_legal_entity_key)
	AND		_tbl_usr_.id_group_key			= ISNULL(@id_group_key			, _tbl_usr_.id_group_key)
	AND		_tbl_usr_.tx_first_name			= ISNULL(@tx_first_name			, _tbl_usr_.tx_first_name)
	AND		_tbl_usr_.tx_last_name			= ISNULL(@tx_last_name			, _tbl_usr_.tx_last_name)
	AND		_tbl_usr_.tx_login_name			= ISNULL(@tx_login_name			, _tbl_usr_.tx_login_name)
--	AND		_tbl_usr_.tx_password			= ISNULL(@tx_password			, _tbl_usr_.tx_password)
	AND		_tbl_usr_.tx_user_alias			= ISNULL(@tx_user_alias			, _tbl_usr_.tx_user_alias)
	AND		_SEL_CLAUSE(_tbl_usr_)
};




#define _HANDLE_TREE_SELECECTION(_rs_name_, _tbl_name_, _key_, _fld_,_ver_)
{
	IF ( _ACTION(_ACTION_TREE))
	{
		SELECT	_rs_name_, _key_, T._ver_, _fld_, T.id_state_key, S.tx_state_name
		FROM	_tbl_name_		T
		JOIN	T_FSM_STATE		S	ON S.id_fsm_state_key = T.id_state_key
		WHERE	S.tx_state_name != _FSM_STATE_APPROVED
		AND		T.dtt_mod		>= @dtt_last_refresh 
		UNION
		SELECT	_rs_name_, _key_, T._ver_,  _fld_, T.id_state_key, S.tx_state_name
		FROM	_tbl_name_		T
		JOIN	T_FSM_STATE		S	ON S.id_fsm_state_key = T.id_state_key
		WHERE	S.tx_state_name	= _FSM_STATE_APPROVED
		AND		T.dtt_mod		>= @l_dt_today
		AND		T.dtt_mod		>= @dtt_last_refresh 
		ORDER	BY	_fld_
		RETURN 0
	}
};
#define _HANDLE_TREE_SELECECTION_SWIFT_MSG_OUT(_rs_name_, _tbl_name_, _key_, _ver_)
{
	IF ( _ACTION(_ACTION_TREE))
	{
		SELECT	_rs_name_, _key_, T._ver_,T.id_state_key, S.tx_state_name
		FROM	_tbl_name_		T
		JOIN	T_FSM_STATE		S	ON S.id_fsm_state_key = T.id_state_key
		JOIN 	REF.T_SSI_TMPLT_MT 		SSI 	ON SSI.id_ssi_tmplt_mt_key 	= T.id_ssi_tmplt_mt_key
		WHERE	S.tx_state_name != _FSM_STATE_APPROVED
		AND		T.dtt_mod		>= @dtt_last_refresh
		AND 	CONVERT(date,T.dtt_created) = ISNULL(@dtt_created , CONVERT(date,GETDATE())) 
		UNION
		SELECT	_rs_name_, _key_, T._ver_,T.id_state_key, S.tx_state_name
		FROM	_tbl_name_		T
		JOIN	T_FSM_STATE		S	ON S.id_fsm_state_key = T.id_state_key
		JOIN 	REF.T_SSI_TMPLT_MT 		SSI 	ON SSI.id_ssi_tmplt_mt_key 	= T.id_ssi_tmplt_mt_key
		WHERE	S.tx_state_name	= _FSM_STATE_APPROVED
		AND		T.dtt_mod		>= @l_dt_today
		AND		T.dtt_mod		>= @dtt_last_refresh
		AND 	CONVERT(date,T.dtt_created) = ISNULL(@dtt_created ,CONVERT(date,GETDATE())) 
		RETURN 0
	}
};

#define _HANDLE_TREE_SELECECTION_SSI_TMPLT(_rs_name_, _tbl_name_, _key_, _fld_,_ver_,_order_)
{
	IF ( _ACTION(_ACTION_TREE))
	{
		SELECT	_rs_name_, _key_, T._ver_, _fld_, T.id_state_key, S.tx_state_name, T._order_
		FROM	_tbl_name_		T
		JOIN	T_FSM_STATE		S	ON S.id_fsm_state_key = T.id_state_key
		WHERE	S.tx_state_name != _FSM_STATE_APPROVED
		AND		T.dtt_mod		>= @dtt_last_refresh 
		AND		T.is_payment_instance				!= 1
		AND 	T.id_legal_entity_key 	= ISNULL (@id_legal_entity_key,T.id_legal_entity_key)
		OR 		T.id_legal_entity_key 	= _DB_NULL_INT
		OR 		T.tx_ssi_tmplt_mt_name 	LIKE 'DEFAULT_TEMPLATE%'
		UNION
		SELECT	_rs_name_, _key_, T._ver_,  _fld_, T.id_state_key, S.tx_state_name, T._order_
		FROM	_tbl_name_		T
		JOIN	T_FSM_STATE		S	ON S.id_fsm_state_key = T.id_state_key
		WHERE	S.tx_state_name	= _FSM_STATE_APPROVED
		AND		T.dtt_mod		>= @l_dt_today
		AND		T.dtt_mod		>= @dtt_last_refresh 
		AND		T.is_payment_instance				!= 1
		AND 	T.id_legal_entity_key 	= ISNULL (@id_legal_entity_key,T.id_legal_entity_key)
		OR 		T.id_legal_entity_key 	= _DB_NULL_INT
		OR 		T.tx_ssi_tmplt_mt_name 	LIKE 'DEFAULT_TEMPLATE%'
		ORDER	BY	T._order_
		RETURN 0
	}
};


#define _HANDLE_TREE_SELECECTION2(_rs_name_, _tbl_name_, _key_, _fld_, _fld2_,_ver_)
{
	IF ( _ACTION(_ACTION_TREE))
	{
		SELECT	_rs_name_, _key_, T._ver_, _fld_, _fld2_, T.id_state_key, S.tx_state_name
		FROM	_tbl_name_		T
		JOIN	T_FSM_STATE		S	ON S.id_fsm_state_key = T.id_state_key
		WHERE	S.tx_state_name != _FSM_STATE_APPROVED
		AND		T.dtt_mod		>= @dtt_last_refresh
		UNION
		SELECT	_rs_name_, _key_, T._ver_, _fld_, _fld2_, T.id_state_key, S.tx_state_name
		FROM	_tbl_name_		T
		JOIN	T_FSM_STATE		S	ON S.id_fsm_state_key = T.id_state_key
		WHERE	S.tx_state_name		= _FSM_STATE_APPROVED
		AND		T.dtt_mod			>= @l_dt_today
		AND		T.dtt_mod			>= @dtt_last_refresh 
		ORDER	BY _fld_, _fld2_
		RETURN 0
	}
};

#define _HANDLE_TREE_SELECECTION3(_rs_name_, _tbl_name_, _key_, _fld_,_ver_)
{
	IF ( _ACTION(_ACTION_TREE))
	{
		SELECT	_rs_name_, _key_, T._ver_, _fld_, T.id_state_key, S.tx_state_name
		FROM	_tbl_name_		T
		JOIN	T_FSM_STATE		S	ON S.id_fsm_state_key = T.id_state_key
		WHERE	S.tx_state_name != _FSM_STATE_APPROVED
		AND		T.dtt_mod		>= @dtt_last_refresh 
		AND		T._key_ 		= ISNULL (@id_legal_entity_key , T._key_)
		UNION
		SELECT	_rs_name_, _key_, T._ver_,  _fld_, T.id_state_key, S.tx_state_name
		FROM	_tbl_name_		T
		JOIN	T_FSM_STATE		S	ON S.id_fsm_state_key = T.id_state_key
		WHERE	S.tx_state_name	= _FSM_STATE_APPROVED
		AND		T.dtt_mod		>= @l_dt_today
		AND		T.dtt_mod		>= @dtt_last_refresh 
		AND		T._key_ 		= ISNULL (@id_legal_entity_key , T._key_)
		ORDER	BY	_fld_
		RETURN 0
	}
};

#define _XHANDLE_TREE_SELECTION_PAYMENT(_rs_name_, _tbl_name_, _key_, _fld_)
{
	IF ( _ACTION(_ACTION_TREE))
	{
		SELECT	_rs_name_, _key_, T.id_version,  _fld_, T.id_state_key, S.tx_state_name
		FROM	_tbl_name_		T
		JOIN	T_FSM_STATE		S	ON S.id_fsm_state_key = T.id_state_key
		JOIN	T_SYSTEM		SYS ON SYS.id_system_key  = T.id_source_system_key
		WHERE	SYS.tx_system_name		= _SYSTEM_NSMART	
		AND		T.dt_pay				= @dt_pay
		AND		T.dtt_mod				>= ISNULL(@dtt_last_refresh, _DB_NULL_DATE)
		AND		_SEL_CLAUSE(T)
		ORDER	BY	_fld_

		RETURN	_STATUS_OK
	}
};

#define _XXHANDLE_TREE_SELECTION_PAYMENT3(_rs_name_, _tbl_name_, _key_, _fld_)
{
	IF ( _ACTION(_ACTION_TREE))
	{
		SELECT	_rs_name_, _key_, T.id_version, V.tx_valuable_id AS tx_valuable_key, T.id_state_key, S.tx_state_name
		FROM	_tbl_name_		T
		JOIN	T_FSM_STATE		S	ON S.id_fsm_state_key = T.id_state_key
		JOIN	T_SYSTEM		SYS ON SYS.id_system_key  = T.id_source_system_key
		JOIN    REF.T_VALUABLE	V	ON V.id_valuable_key  = T.id_valuable_key
		WHERE	SYS.tx_system_name		= _SYSTEM_NSMART	
		AND		T.dt_pay				= @dt_pay
		AND		T.dtt_mod				>= ISNULL(@dtt_last_refresh, _DB_NULL_DATE)
		AND		_SEL_CLAUSE(T)
		ORDER	BY	V.tx_valuable_id

		RETURN	_STATUS_OK
	}
};


#define _HANDLE_TREE_SELECTION_PAYMENT(_rs_name_, _tbl_name_, _key_, _fld_, _pay_type)
{
	IF ( _ACTION(_ACTION_TREE))
	{
		SELECT	_rs_name_, _key_, T.id_payment_ver, ISNULL(V.tx_valuable_id, _DB_NULL_STR) AS tx_valuable_key, T.id_state_key, S.tx_state_name
		FROM	_tbl_name_		T
		JOIN	T_FSM_STATE		S	ON S.id_fsm_state_key = T.id_state_key
		JOIN	T_SYSTEM		SYS ON SYS.id_system_key  = T.id_source_system_key
		LEFT  JOIN    REF.T_VALUABLE	V	ON V.id_valuable_key  = T.id_valuable_key
		WHERE	SYS.tx_system_name		= _SYSTEM_NSMART	
		AND		T.dt_pay				= @dt_pay
		AND		T.dtt_mod				>= ISNULL(@dtt_last_refresh, _DB_NULL_DATE)
		AND		_SEL_CLAUSE(T)
		AND		T.is_expected_payment	= _pay_type
		ORDER	BY	V.tx_valuable_id

		RETURN	_STATUS_OK
	}
};

#define _HANDLE_TREE_SELECTION_PAYMENT2(_rs_name_, _tbl_name_, _key_, _fld_, _pay_type)
{
	IF ( _ACTION(_ACTION_TREE))
	{
		SELECT	_rs_name_, T._key_, T.id_payment_ver, ISNULL(V.tx_valuable_id, _DB_NULL_STR) AS tx_valuable_key, T.id_state_key, S.tx_state_name
		FROM	_tbl_name_		T
		JOIN	T_FSM_STATE		S	ON S.id_fsm_state_key = T.id_state_key
		JOIN	T_SYSTEM		SYS ON SYS.id_system_key  = T.id_source_system_key
		LEFT  JOIN    REF.T_VALUABLE	V	ON V.id_valuable_key  = T.id_valuable_key
		LEFT JOIN	[REF].[T_SSI_TMPLT_MT]       M	ON  M.id_payment_key		= T.id_payment_key
		LEFT JOIN	[REF].[T_SSI_TMPLT_MT_FIELD] F  ON  M.id_ssi_tmplt_mt_key	= F.id_ssi_tmplt_mt_key
		WHERE	SYS.tx_system_name		= _SYSTEM_NSMART	
		AND		T.dt_pay				= @dt_pay
		AND		T.dtt_mod				>= ISNULL(@dtt_last_refresh, _DB_NULL_DATE)
		AND		_SEL_CLAUSE(T)
		AND		T.is_expected_payment	= _pay_type
		AND 	T.id_legal_entity_key 	= ISNULL(@id_legal_entity_key, T.id_legal_entity_key)
		AND		F.tx_uniq_mt_field_tag = '20'
		ORDER	BY	V.tx_valuable_id

		RETURN	_STATUS_OK
	}
};

#define _LEGAL_ENTITY_WHERE_CLAUSE(_t1_)
{
			_t1_.id_legal_entity_key	= ISNULL(@id_legal_entity_key	, _t1_.id_legal_entity_key)
	AND		_t1_.tx_legal_entity_name	= ISNULL(@tx_legal_entity_name	, _t1_.tx_legal_entity_name)
	AND		_t1_.tx_legal_entity_alias	= ISNULL(@tx_legal_entity_alias	, _t1_.tx_legal_entity_alias)
	AND		_t1_.tx_desc				= ISNULL(@tx_desc				, _t1_.tx_desc)
	AND		_t1_.dtt_mod				>= ISNULL(@dtt_last_refresh		, _DB_NULL_DATE)
	AND		_SEL_CLAUSE(_t1_)
};

#define _LEGAL_ENTITY_BIC_WHERE_CLAUSE(_t1_)
{
			_t1_.id_legal_entity_bic_key	= ISNULL(id_legal_entity_bic_key	, _t1_.id_legal_entity_bic_key)
	AND		_t1_.id_legal_entity_key		= ISNULL(@id_legal_entity_key		, _t1_.id_legal_entity_key)
	AND		_t1_.id_type_key				= ISNULL(@id_type_key				, _t1_.id_type_key)
	AND		_t1_.tx_bic_name				= ISNULL(@tx_bic_name				, _t1_.tx_bic_name)
	AND		_t1_.tx_bic_code				= ISNULL(@tx_bic_code				, _t1_.tx_bic_code)
	AND		_t1_.is_primary					= ISNULL(@is_primary				, _t1_.is_primary)
	AND		_t1_.tx_desc					= ISNULL(@tx_desc					, _t1_.tx_desc)
	AND		_t1_.dtt_mod					>= ISNULL(@dtt_last_refresh			, _DB_NULL_DATE)
	AND		_SEL_CLAUSE(_t1_)
};
					

#endif