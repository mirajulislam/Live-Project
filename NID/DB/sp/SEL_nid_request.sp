/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Kh. Assaduzzaman Sohan
* Date          : 8 DEC 2019
* Description   : This SP will use to SELECT data in T_NID_REQUEST Table
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _SP_NAME            {SEL_nid_request};
#define _TABLE_NAME         {T_NID_REQUEST};
#define _PRIMARY_KEY        {id_nid_request_key};
#define _VERSION            {id_nid_request_ver};

_DROP_PROC

_CREATE_PROC (_SP_NAME)
    
    _SP_PARAM_HEADER

    , @_PRIMARY_KEY                 INT                             = NULL    
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
	_SP_SEL_HEADER

         SELECT  tx_rs_type = 'RS_TYPE_NID_REQUEST'
         , NR.*
         FROM _TABLE_NAME NR
         WHERE  is_valid_req        = ISNULL(@is_valid_req      ,is_valid_req)
         AND    int_data_source     = ISNULL(@int_data_source   ,int_data_source)
         AND    is_success_req      = ISNULL(@is_success_req    ,is_success_req)
         AND    tx_call_back_url    = ISNULL(@tx_call_back_url  ,tx_call_back_url)
         AND    is_active           = 1

	_SP_FOOTER
}
go

_GRANT_PERM_SP