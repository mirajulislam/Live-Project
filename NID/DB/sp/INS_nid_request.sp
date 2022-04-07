/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Kh. Assaduzzaman Sohan
* Date          : 8 DEC 2019
* Description   : This SP will use to INSERT data in T_NID_REQUEST Table
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _SP_NAME            {INS_nid_request};
#define _TABLE_NAME         {T_NID_REQUEST};
#define _PRIMARY_KEY        {id_nid_request_key};
#define _VERSION            {id_nid_request_ver};

_DROP_PROC

_CREATE_PROC (_SP_NAME)
    
    _SP_PARAM_HEADER

    , @_PRIMARY_KEY                 INT                             = NULL    OUTPUT  
    , @_VERSION                     INT                             = NULL  

    , @id_nid_key                   INT                             = NULL    

    , @dtt_request                  DATETIME                        = NULL
    , @dtt_response                 DATETIME                        = NULL

    , @is_valid_req                 INT                             = NULL  
    , @int_data_source              INT                             = NULL  
    , @is_success_req               INT                             = NULL  
    , @int_match_percentage         INT                             = NULL

    , @tx_comments                  VARCHAR(512)                    = NULL
    , @tx_call_back_url             VARCHAR(128)                    = NULL

_SP_PARAM_FOOTER

AS

{
	_SP_HEADER

	_INIT_VERSION(@_VERSION)

	_BEGIN_TRAN


	INSERT INTO _TABLE_NAME
           (
              _VERSION
             ,_TABLE_HEADER_INS_FIELD_WITH_STATE
             
             , id_nid_key
             , dtt_request         
             , dtt_response        
             , is_valid_req        
             , int_data_source     
             , is_success_req      
             , int_match_percentage
             , tx_comments
             , tx_call_back_url         
           )
           VALUES
           (  
            @_VERSION
           ,_TABLE_HEADER_INS_VAL_WITH_STATE

           ,ISNULL(@id_nid_key            ,_DB_NULL_INT)
           ,ISNULL(@dtt_request           ,_DB_NULL_DATE)
           ,ISNULL(@dtt_response          ,_DB_NULL_DATE)

           ,ISNULL(@is_valid_req          , _DB_NULL_INT)
           ,ISNULL(@int_data_source       , _DB_NULL_INT)
           ,ISNULL(@is_success_req        , _DB_NULL_INT)
           ,ISNULL(@int_match_percentage  , _DB_NULL_INT)
           ,ISNULL(@tx_comments           , _DB_NULL_STR)
           ,ISNULL(@tx_call_back_url      , _DB_NULL_STR)
           )

           SELECT @_PRIMARY_KEY = IDENT_CURRENT('T_NID_REQUEST')

			_STORE_SYS_VARS
			SELECT @g_tx_err_msg = _GEM_INSERT(_TABLE_NAME, @_PRIMARY_KEY)
			
			_HANDLE_ZERO_ROW_COUNT(_GEC_INSERT, @g_tx_err_msg)

			_TOUCHED_TABLE(_TABLE_NAME)

		_COMMIT_TRAN

	_SP_FOOTER

	RETURN _STATUS_OK
}
go

_GRANT_PERM_SP