/* __VER_INFO__  :  */
/******************************************************************************
* Author		: Kh. Kamruzzaman
* Date			: 2020-02-01
* Description	: 
******************************************************************************/

#include <nSMART_SQL.h>

#define _SP_NAME 			{ACT_existing_liability};
#define _TABLE_NAME 		{T_EXISTING_LIABILITY};
#define _PRIMARY_KEY		{id_existing_liability_key};
#define _VERSION			{id_existing_liability_ver};


_DROP_PROC

_CREATE_PROC (_SP_NAME)

	_SP_PARAM_HEADER

	, @_PRIMARY_KEY					int									= NULL		OUTPUT
	, @_VERSION						int									= NULL		OUTPUT
	
	, @id_loan_key					int 								= null
	, @tx_bank_name					varchar(64)							= NULL
	, @tx_product_name				varchar(64)							= NULL
	, @dec_disbursed				decimal(16, 3)						= NULL		
	, @dec_current_outstanding		decimal(16, 3)						= NULL		
	, @dec_emi_size					decimal(16, 3)						= NULL
	, @tx_remarks					varchar(512)						= NULL

	_SP_PARAM_FOOTER
AS
{

	_SP_HEADER

	IF ( @tx_action_name = _ACTION_NEW )
	{
		_INIT_VERSION(@_VERSION)

		INSERT INTO _TABLE_NAME
	    (
		    _VERSION
		    ,_TABLE_HEADER_INS_FIELD_WITH_STATE
		          
		    , id_loan_key				                
		    , tx_bank_name				              
		    , tx_product_name			
		    , dec_disbursed			
		    , dec_current_outstanding	
		    , dec_emi_size				
		    , tx_remarks				
	    )
	    VALUES
	    (  
		    @_VERSION
		    ,_TABLE_HEADER_INS_VAL_WITH_STATE

		    , ISNULL(@id_loan_key					            , _DB_NULL_INT)
		    , ISNULL(@tx_bank_name					           	, _DB_NULL_STR)
		    , ISNULL(@tx_product_name				            , _DB_NULL_STR)
		    , ISNULL(@dec_disbursed				             	, _DB_NULL_INT)
		    , ISNULL(@dec_current_outstanding		            , _DB_NULL_INT)
		    , ISNULL(@dec_emi_size					            , _DB_NULL_INT)
		    , ISNULL(@tx_remarks					            , _DB_NULL_STR)
	    )

	    SELECT @_PRIMARY_KEY = IDENT_CURRENT('T_EXISTING_LIABILITY')

		_STORE_SYS_VARS
		SELECT @g_tx_err_msg = _GEM_INSERT(_TABLE_NAME, @_PRIMARY_KEY)
		
		_HANDLE_ZERO_ROW_COUNT(_GEC_INSERT, @g_tx_err_msg)

		_TOUCHED_TABLE(_TABLE_NAME)

		_SET_ACTION('SELECT_ON_ACTION')
	}
	

	IF (@tx_action_name = _ACTION_DELETE)
	{	
		_SET_ACTION(_ACTION_UPDATE)
		, @is_active = 0
	}

	IF( @tx_action_name = _ACTION_UPDATE )
	{
	
		UPDATE _TABLE_NAME
		SET 
		 _TABLE_HEADER_UPD_WITH_STATE

		, id_loan_key				= ISNULL(@id_loan_key				, id_loan_key			 )
		, tx_bank_name				= ISNULL(@tx_bank_name				, tx_bank_name			 )
		, tx_product_name	 		= ISNULL(@tx_product_name			, tx_product_name		 )
		, dec_disbursed				= ISNULL(@dec_disbursed				, dec_disbursed			 )
		, dec_current_outstanding	= ISNULL(@dec_current_outstanding	, dec_current_outstanding)
		, dec_emi_size				= ISNULL(@dec_emi_size				, dec_emi_size			 )
		, tx_remarks				= ISNULL(@tx_remarks				, tx_remarks			 )

		WHERE   _PRIMARY_KEY    = ISNULL(@_PRIMARY_KEY        ,_PRIMARY_KEY)
		AND     is_active = 1
		
		_TOUCHED_TABLE(_TABLE_NAME)

		_SET_ACTION('SELECT_ON_ACTION')

	}

	IF ( @tx_action_name = _ACTION_SELECT )
	{
		SELECT  tx_rs_type = 'RS_TYPE_EXISTING_LIABILITY'
		, L.*
		FROM  _TABLE_NAME L
		WHERE 	_PRIMARY_KEY  		= ISNULL(@_PRIMARY_KEY, _PRIMARY_KEY)
		AND 	id_loan_key      	= ISNULL(@id_loan_key, id_loan_key)
		AND    is_active = 1
	}

	IF ( @tx_action_name = 'SELECT_ON_ACTION' )
	{
		SELECT  tx_rs_type = 'RS_TYPE_EXISTING_LIABILITY'
		, L.*
		FROM  _TABLE_NAME L
		WHERE id_loan_key      	= ISNULL(@id_loan_key, id_loan_key)
		AND    is_active = 1
	}

	_SP_FOOTER
}
go


_GRANT_PERM_SP