/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Mirajul.islam
* Date          : 15 FEB 2021
* Description   : 
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _SP_NAME        {UPD_complaint};
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

	UPDATE _TABLE_NAME
  	SET 
  	_TABLE_HEADER_UPD_WITH_STATE

  	,	_VERSION			= 	_VERSION+1
  	,	dtt_txn_date		=	ISNULL(@dtt_txn_date 		,	dtt_txn_date)				
	,	tx_atm_owner		=	ISNULL(@tx_atm_owner 		,	tx_atm_owner)		
	,	dec_txn_amount		=	ISNULL(@dec_txn_amount 		,	dec_txn_amount)	
	,	tx_account_number	=	ISNULL(@tx_account_number 	,	tx_account_number)			
	,	tx_card_number		=	ISNULL(@tx_card_number 		,	tx_card_number)		
	,	tx_atm_location		=	ISNULL(@tx_atm_location 	,	tx_atm_location)		
	,	tx_comment			=	ISNULL(@tx_comment 			,	tx_comment)	
	,	tx_data_source		=	ISNULL(@tx_data_source 		,	tx_data_source)		
	WHERE _PRIMARY_KEY 		= @_PRIMARY_KEY
	AND   is_active 		= 1

	_TOUCHED_TABLE(_TABLE_NAME)

	_SP_FOOTER
	RETURN _STATUS_OK
}
go

_GRANT_PERM_SP