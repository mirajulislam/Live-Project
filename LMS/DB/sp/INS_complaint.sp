/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Mirajul.islam
* Date          : 15 FEB 2021
* Description   : 
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _SP_NAME        {INS_complaint};
#define _TABLE_NAME     {T_COMPLAINT};
#define _PRIMARY_KEY    {id_customer_complaint_key};
#define _VERSION        {id_customer_complaint_ver};

_DROP_PROC

_CREATE_PROC (_SP_NAME)
    
    _SP_PARAM_HEADER

    , @_PRIMARY_KEY                     INT                    = NULL       OUTPUT
    , @_VERSION                         INT                    = NULL 

    , @dtt_txn_date 					DATETIME        	   = NULL
	, @dtt_create                       DATETIME        	   = NULL
	, @tx_atm_owner						VARCHAR(256)    	   = NULL
	, @dec_txn_amount					DECIMAL(20, 2)  	   = NULL
	, @tx_account_number				VARCHAR(256)    	   = NULL
	, @tx_card_number					VARCHAR(256)    	   = NULL
	, @tx_atm_location					VARCHAR(256)    	   = NULL
	, @tx_comment						VARCHAR(256)    	   = NULL
	, @tx_data_source					VARCHAR(256)    	   = NULL
	, @id_creator_key                   INT             	   = NULL   
	, @int_tracking_number              INT                    = NULL  
	
	_SP_PARAM_FOOTER

AS

{
	_SP_HEADER

	_INIT_VERSION(@_VERSION)

	INSERT INTO _TABLE_NAME
    (
         	_VERSION
        ,	_TABLE_HEADER_INS_FIELD_WITH_STATE

        ,	dtt_txn_date
		,	dtt_create
		,	tx_atm_owner
		,	dec_txn_amount
		,	tx_account_number
		,	tx_card_number
		,	tx_atm_location
		,	tx_comment
		,	tx_data_source
		,	id_creator_key
		,	int_tracking_number
    )
    VALUES
    (  
        @_VERSION
        ,_TABLE_HEADER_INS_VAL_WITH_STATE

        , ISNULL(@dtt_txn_date 			,	_DB_NULL_DATE)			
		, ISNULL(@dtt_create 			,	GETDATE())			
		, ISNULL(@tx_atm_owner 			,	_DB_NULL_STR)			
		, ISNULL(@dec_txn_amount 		,	_DB_NULL_FLOAT)				
		, ISNULL(@tx_account_number 	,	_DB_NULL_STR)					
		, ISNULL(@tx_card_number 		,	_DB_NULL_STR)				
		, ISNULL(@tx_atm_location 		,	_DB_NULL_STR)				
		, ISNULL(@tx_comment 			,	_DB_NULL_STR)			
		, ISNULL(@tx_data_source 		,	_DB_NULL_STR)				
		, ISNULL(@id_user_mod_key		,	_DB_NULL_INT)
		, ISNULL(@int_tracking_number	,	_DB_NULL_INT)
    )

    SELECT @_PRIMARY_KEY = IDENT_CURRENT('T_COMPLAINT')

    UPDATE _TABLE_NAME
    SET _VERSION = _VERSION + 1
    , int_tracking_number = @_PRIMARY_KEY
    where _PRIMARY_KEY 	  = @_PRIMARY_KEY
    _STORE_SYS_VARS
	SELECT @g_tx_err_msg = _GEM_INSERT(_TABLE_NAME, @_PRIMARY_KEY)
	
	_HANDLE_ZERO_ROW_COUNT(_GEC_INSERT, @g_tx_err_msg)

	_TOUCHED_TABLE(_TABLE_NAME)


	_SP_FOOTER
	RETURN _STATUS_OK
}
go

_GRANT_PERM_SP