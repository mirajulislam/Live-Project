/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Mirajul Islam
* Date          : 23 June 2021
* Description   : Insert , Update , Select T_LMS_SMS table
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _SP_NAME        {ACT_lms_sms};
#define _TABLE_NAME     {T_LMS_SMS};
#define _PRIMARY_KEY    {id_sms_key};
#define _VERSION        {id_sms_version};

_DROP_PROC

_CREATE_PROC (_SP_NAME)
    
    _SP_PARAM_HEADER

    , @_PRIMARY_KEY                          INT                           = NULL       OUTPUT
    , @_VERSION                              INT                           = NULL   

    , @tx_client_user_name                   VARCHAR(256)                  = NULL
    , @tx_client_cbs_sms_id                  VARCHAR(256)                  = NULL
    , @dtt_txn_date_time					 DATETIME
    , @tx_sender_id                          VARCHAR(256)                  = NULL
    , @tx_sms_type                           VARCHAR(256)                  = NULL
    , @tx_acct_id                            VARCHAR(256)                  = NULL
    , @tx_credit_debit                       VARCHAR(256)                  = NULL
    , @dec_amount                            DECIMAL(20, 2)                = NULL
    , @tx_cell_phone                         VARCHAR(256)                  = NULL
    , @tx_send_to_number                     VARCHAR(256)                  = NULL
    , @tx_message                            VARCHAR(256)                  = NULL
    , @dtt_client_request_datetime		 	 DATETIME                      = NULL
    , @dtt_expiry_datetime					 DATETIME                      = NULL
    , @int_retry_count                       INT                           = NULL
    , @int_default_sms_length                INT                           = NULL
    , @tx_telco_local_prefix                 VARCHAR(256)                  = NULL
    , @tx_telco_name                         VARCHAR(256)                  = NULL
    , @tx_status                             VARCHAR(256)                  = NULL
    , @tx_customer_no                        VARCHAR(256)                  = NULL
    , @tx_sms_format                         VARCHAR(256)                  = NULL
    , @int_unicode                           INT                           = NULL
    , @int_message_type                      INT                           = NULL
    , @tx_tz_name                            VARCHAR(256)                  = NULL
    , @id_loan_key                           INT                           = NULL
    , @tx_sms_status                         VARCHAR(256)                  = NULL
    , @tx_check_client_cbs_sms_id            VARCHAR(256)                  = NULL
    , @tx_gateway_name                       VARCHAR(256)                  = NULL
    , @dtt_operator_req_time				 DATETIME                      = NULL
    , @presentStatus                         VARCHAR(256)                  = NULL
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

		    , tx_client_user_name
		    , tx_client_cbs_sms_id
		    , dtt_txn_date_time
		    , tx_sender_id
		    , tx_sms_type
		    , tx_acct_id
		    , tx_credit_debit
		    , dec_amount
		    , tx_cell_phone
		    , tx_send_to_number
		    , tx_message
		    , dtt_client_request_datetime
		    , dtt_expiry_datetime
		    , int_retry_count
		    , int_default_sms_length
		    , tx_telco_local_prefix
		    , tx_telco_name
		    , tx_status
		    , tx_customer_no
		    , tx_sms_format
		    , int_unicode
		    , int_message_type
		    , tx_tz_name
		    , id_loan_key
		    , tx_sms_status
		    , tx_gateway_name
		    , dtt_operator_req_time
		)
		VALUES
	    (  
		       @_VERSION
		    , _TABLE_HEADER_INS_VAL_WITH_STATE

		    , ISNULL(@tx_client_user_name                          , _DB_NULL_STR)
		    , ISNULL(@tx_client_cbs_sms_id                         , _DB_NULL_STR)
		    , ISNULL(@dtt_txn_date_time                            , _DB_NULL_DATE)
		    , ISNULL(@tx_sender_id                                 , _DB_NULL_STR)
		    , ISNULL(@tx_sms_type                                  , _DB_NULL_STR)
		    , ISNULL(@tx_acct_id                                   , _DB_NULL_STR)
		    , ISNULL(@tx_credit_debit                              , _DB_NULL_STR)
		    , ISNULL(@dec_amount                                   , _DB_NULL_FLOAT)
		    , ISNULL(@tx_cell_phone                                , _DB_NULL_STR)
		    , ISNULL(@tx_send_to_number                            , _DB_NULL_STR)
		    , ISNULL(@tx_message                                   , _DB_NULL_STR)
		    , ISNULL(@dtt_client_request_datetime                  , _DB_NULL_DATE)
		    , ISNULL(@dtt_expiry_datetime                          , _DB_NULL_DATE)
		    , ISNULL(@int_retry_count                              , _DB_NULL_INT)
		    , ISNULL(@int_default_sms_length                       , _DB_NULL_INT)
		    , ISNULL(@tx_telco_local_prefix                        , _DB_NULL_STR)
		    , ISNULL(@tx_telco_name                                , _DB_NULL_STR)
		    , ISNULL(@tx_status                                    , _DB_NULL_STR)
		    , ISNULL(@tx_customer_no                               , _DB_NULL_STR)
		    , ISNULL(@tx_sms_format                                , _DB_NULL_STR)
		    , ISNULL(@int_unicode                                  , _DB_NULL_INT)
		    , ISNULL(@int_message_type                             , _DB_NULL_INT)
		    , ISNULL(@tx_tz_name                                   , _DB_NULL_STR)
		    , ISNULL(@id_loan_key                                  , _DB_NULL_INT)
		    , ISNULL(@tx_sms_status                                , _DB_NULL_STR)
		    , ISNULL(@tx_gateway_name                              , _DB_NULL_STR)
		    , ISNULL(@dtt_operator_req_time                        , _DB_NULL_DATE)
		)
		
		   UPDATE T_LOAN
           SET id_loan_ver  = id_loan_ver + 1
           , dtt_mod = getdate()
		   , tx_sms_status = @tx_sms_status
          where id_loan_key = @id_loan_key
		

		SELECT @_PRIMARY_KEY = IDENT_CURRENT('T_LMS_SMS')

	}

	IF(@tx_action_name = _ACTION_UPDATE)
	{

		UPDATE	_TABLE_NAME
		SET	_VERSION					= _VERSION + 1  
			, _TABLE_HEADER_UPD
			
			, tx_client_user_name         = ISNULL(@tx_client_user_name, 	          	tx_client_user_name)
		    , tx_client_cbs_sms_id        = ISNULL(@tx_client_cbs_sms_id, 		        tx_client_cbs_sms_id)
		    , dtt_txn_date_time           = ISNULL(@dtt_txn_date_time, 		            dtt_txn_date_time)
		    , tx_sender_id                = ISNULL(@tx_sender_id, 		                tx_sender_id)
		    , tx_sms_type                 = ISNULL(@tx_sms_type, 		                tx_sms_type)
		    , tx_acct_id                  = ISNULL(@tx_acct_id, 		                tx_acct_id)
		    , tx_credit_debit             = ISNULL(@tx_credit_debit, 	          	    tx_credit_debit)
		    , dec_amount                  = ISNULL(@dec_amount, 		                dec_amount)
		    , tx_cell_phone               = ISNULL(@tx_cell_phone, 		                tx_cell_phone)
		    , tx_send_to_number           = ISNULL(@tx_send_to_number, 	            	tx_send_to_number)
		    , tx_message                  = ISNULL(@tx_message, 		                tx_message)
		    , dtt_client_request_datetime = ISNULL(@dtt_client_request_datetime, 		dtt_client_request_datetime)
		    , dtt_expiry_datetime         = ISNULL(@dtt_expiry_datetime, 		        dtt_expiry_datetime)
		    , int_retry_count             = ISNULL(@int_retry_count, 		            int_retry_count)
		    , int_default_sms_length      = ISNULL(@int_default_sms_length, 		    int_default_sms_length)
		    , tx_telco_local_prefix       = ISNULL(@tx_telco_local_prefix, 		        tx_telco_local_prefix)
		    , tx_telco_name               = ISNULL(@tx_telco_name, 		                tx_telco_name)
		    , tx_status                   = ISNULL(@tx_status, 		                    tx_status)
		    , tx_customer_no              = ISNULL(@tx_customer_no, 		            tx_customer_no)
		    , tx_sms_format               = ISNULL(@tx_sms_format, 		                tx_sms_format)
		    , int_unicode                 = ISNULL(@int_unicode, 		                int_unicode)
		    , int_message_type            = ISNULL(@int_message_type, 	               	int_message_type)
		    , tx_tz_name                  = ISNULL(@tx_tz_name, 	                  	tx_tz_name)
		    , id_loan_key                 = ISNULL(@id_loan_key, 	                  	id_loan_key)
		    , tx_sms_status               = ISNULL(@tx_sms_status, 	                 	tx_sms_status)
		    , tx_gateway_name             = ISNULL(@tx_gateway_name, 	                tx_gateway_name)
		    , dtt_operator_req_time       = ISNULL(@dtt_operator_req_time, 	            dtt_operator_req_time)
				
		WHERE	tx_client_cbs_sms_id	= @tx_client_cbs_sms_id

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

	}

	IF(@tx_action_name = 'SELECT_SMS_CBS_SMS_ID')
	{
	  SELECT tx_rs_type = 'RS_TYPE_SMS_CBS_SMS_ID'
	  , tx_client_cbs_sms_id
	  from T_LMS_SMS 
	  where tx_client_cbs_sms_id = @tx_check_client_cbs_sms_id
	}

	IF(@tx_action_name = 'SELECT_SEND_SMS_LOAN')
	{
	  SELECT tx_rs_type = 'RS_TYPE_SELECT_SEND_SMS_LOAN'
	  , LS.*
	  from T_LMS_SMS LS
	  where tx_sms_status NOT IN('SENT_TO_SMS_CLIENT','FAILED_TO_SENT');
	}
	
	_SP_FOOTER
}
go


_GRANT_PERM_SP