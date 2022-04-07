/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Kh. Assaduzzaman Sohan
* Date          : 8 DEC 2019
* Description   : This SP will use to UPDATE data in T_NID_REQUEST Table
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _SP_NAME            {UPD_nid_request};
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

	_BEGIN_TRAN

      UPDATE _TABLE_NAME
       SET _TABLE_HEADER_UPD_WITH_STATE
          ,id_nid_key             = ISNULL(@id_nid_key            ,id_nid_key) 
          ,dtt_request            = ISNULL(@dtt_request           ,dtt_request) 
          ,dtt_response           = ISNULL(@dtt_response          ,dtt_response) 
          ,is_valid_req           = ISNULL(@is_valid_req          ,is_valid_req) 
          ,int_data_source        = ISNULL(@int_data_source       ,int_data_source) 
          ,is_success_req         = ISNULL(@is_success_req        ,is_success_req) 
          ,int_match_percentage   = ISNULL(@int_match_percentage  ,int_match_percentage) 
          ,tx_comments            = ISNULL(@tx_comments           ,tx_comments) 
          ,tx_call_back_url       = ISNULL(@tx_call_back_url      ,tx_call_back_url) 

      WHERE id_nid_request_key        = ISNULL(@id_nid_request_key      ,id_nid_request_key)
      AND   is_active           = 1

			_TOUCHED_TABLE(_TABLE_NAME)

		_COMMIT_TRAN

	_SP_FOOTER

	RETURN _STATUS_OK
}
go

_GRANT_PERM_SP