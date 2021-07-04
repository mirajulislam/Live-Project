/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Mirajul Islam
* Date          : 23 June 2021
* Description   : Insert ,  Select T_SMS_RESULT table
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _SP_NAME        {ACT_sms_result};
#define _TABLE_NAME     {T_SMS_RESULT};
#define _PRIMARY_KEY    {id_sms_result_key};
#define _VERSION        {id_sms_result_version};

_DROP_PROC

_CREATE_PROC (_SP_NAME)
    
    _SP_PARAM_HEADER

    , @_PRIMARY_KEY                          INT                           = NULL       OUTPUT
    , @_VERSION                              INT                           = NULL 

    , @tx_gateway_id                         VARCHAR(256)                   = NULL
    , @tx_gateway_name                       VARCHAR(256)                   = NULL
    , @tx_client_cbs_sms_id                  VARCHAR(256)                   = NULL
    , @tx_sms_number                         VARCHAR(256)                   = NULL
    , @tx_sms_status                         VARCHAR(256)                   = NULL
    , @tx_telco_sms_id                       VARCHAR(256)                   = NULL
    , @tx_sender_id                          VARCHAR(256)                   = NULL
    , @id_loan_key                           INT                            = NULL 
    , @tx_sms_msg                            VARCHAR(256)                   = NULL
    , @dtt_telco_response_time		 	     DATETIME  
    , @presentStatus                         VARCHAR(256)                  = NULL
    , @presentSMSStatus                      VARCHAR(256)                  = NULL
    , @id_loan_key_sel                       INT                           = NULL

    _SP_PARAM_FOOTER

AS
{

	_SP_HEADER

	IF ( @tx_action_name = 'NEW' )
	{
		_INIT_VERSION(@_VERSION)

		INSERT INTO _TABLE_NAME
	    (	    	
		      _VERSION
		    , _TABLE_HEADER_INS_FIELD_WITH_STATE

		    , tx_gateway_id
		    , tx_gateway_name
		    , tx_client_cbs_sms_id
		    , tx_sms_number
		    , tx_sms_status
		    , tx_telco_sms_id
		    , tx_sender_id
		    , id_loan_key
		    , tx_sms_msg
		    , dtt_telco_response_time
    	)
		VALUES
	    (  
		       @_VERSION
		    , _TABLE_HEADER_INS_VAL_WITH_STATE

		    , ISNULL(@tx_gateway_id                                  , _DB_NULL_STR)
		    , ISNULL(@tx_gateway_name                                , _DB_NULL_STR)
		    , ISNULL(@tx_client_cbs_sms_id                           , _DB_NULL_STR)
		    , ISNULL(@tx_sms_number                                  , _DB_NULL_STR)
		    , ISNULL(@tx_sms_status                                  , _DB_NULL_STR)
		    , ISNULL(@tx_telco_sms_id                                , _DB_NULL_STR)
		    , ISNULL(@tx_sender_id                                   , _DB_NULL_STR)
		    , ISNULL(@id_loan_key                                    , _DB_NULL_INT)
		    , ISNULL(@tx_sms_msg                                     , _DB_NULL_STR)
		    , ISNULL(@dtt_telco_response_time                        , _DB_NULL_DATE)
		)

		SELECT @id_loan_key_sel = id_loan_key 
        FROM T_LMS_SMS
        WHERE tx_client_cbs_sms_id = @tx_client_cbs_sms_id

		SELECT @presentStatus = tx_sms_status 
        FROM T_LOAN
        WHERE id_loan_key = @id_loan_key_sel

		if(@presentStatus !=@tx_sms_status)
		{
		   UPDATE T_LOAN
           SET id_loan_ver  = id_loan_ver + 1
           , dtt_mod = getdate()
		   , tx_sms_status = @tx_sms_status
          where id_loan_key = @id_loan_key_sel
		}

		SELECT @presentSMSStatus = tx_sms_status 
        FROM T_LMS_SMS
        where tx_client_cbs_sms_id = @tx_client_cbs_sms_id

		if(@presentSMSStatus !=@tx_sms_status)
		{
			UPDATE T_LMS_SMS
	        SET id_sms_version  = id_sms_version + 1
	        , dtt_mod = getdate()
			, tx_sms_status = @tx_sms_status
	        where tx_client_cbs_sms_id = @tx_client_cbs_sms_id
		}
		
		SELECT @_PRIMARY_KEY = IDENT_CURRENT('T_SMS_RESULT')		
       
	}

	_SP_FOOTER
}
go


_GRANT_PERM_SP