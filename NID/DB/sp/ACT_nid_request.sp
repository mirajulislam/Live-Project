/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Kh. Assaduzzaman Sohan
* Date          : 8 DEC 2019
* Description   : This SP will use to execute INSERT, UPDATE, SELECT SP of T_NID_REQUEST Table
*****************************************************************************************/
#include <nSMART_SQL.h>


#define _SP_NAME            {ACT_nid_request};
#define _TABLE_NAME         {T_NID_REQUEST};
#define _PRIMARY_KEY        {id_nid_request_key};
#define _VERSION            {id_nid_request_ver};

_DROP_PROC

_CREATE_PROC (_SP_NAME)
    
    _SP_PARAM_HEADER

	  , @_PRIMARY_KEY					        INT								= NULL	OUTPUT	
	  , @_VERSION						          INT								= NULL	

    , @id_nid_key                   INT               = NULL    

    , @dtt_request                  DATETIME          = NULL
    , @dtt_response                 DATETIME          = NULL

    , @is_valid_req                 INT               = NULL  
    , @int_data_source              INT               = NULL  
    , @is_success_req               INT               = NULL  
    , @int_match_percentage         INT               = NULL

    , @tx_comments                  VARCHAR(512)      = NULL
    , @tx_call_back_url             VARCHAR(128)      = NULL

_SP_PARAM_FOOTER

AS

{
	_SP_HEADER

  IF ( @tx_action_name = _ACTION_NEW )
  {
      EXEC @g_id_return_status = INS_nid_request

         _SP_ARGS_HEADER
        , @_PRIMARY_KEY         =  @_PRIMARY_KEY    OUTPUT  
        , @_VERSION             =  @_VERSION       
        , @id_nid_key           =  @id_nid_key       

        , @dtt_request          = @dtt_request         
        , @dtt_response         = @dtt_response        
        , @is_valid_req         = @is_valid_req        
        , @int_data_source      = @int_data_source     
        , @is_success_req       = @is_success_req      
        , @int_match_percentage = @int_match_percentage
        , @tx_comments          = @tx_comments
        , @tx_call_back_url     = @tx_call_back_url 

        _RETURN_IF_SP_ERROR(INS_nid_request)
  }
  IF ( @tx_action_name = _ACTION_SELECT )
  {

        EXEC @g_id_return_status = SEL_nid_request
        
         _SP_ARGS_HEADER
        , @_PRIMARY_KEY         =  @_PRIMARY_KEY      
        , @_VERSION             =  @_VERSION       
        , @id_nid_key           =  @id_nid_key       

        , @dtt_request          = @dtt_request         
        , @dtt_response         = @dtt_response        
        , @is_valid_req         = @is_valid_req        
        , @int_data_source      = @int_data_source     
        , @is_success_req       = @is_success_req      
        , @int_match_percentage = @int_match_percentage
        , @tx_comments          = @tx_comments
        , @tx_call_back_url     = @tx_call_back_url    

    _RETURN_IF_SP_ERROR(SEL_nid_request)
  }

  IF (@tx_action_name = _ACTION_DELETE)
  { 
    _SET_ACTION(_ACTION_UPDATE)
    , @is_active = 0
  }

  IF( @tx_action_name = _ACTION_UPDATE )
  {
        EXEC @g_id_return_status = UPD_nid_request

         _SP_ARGS_HEADER
        , @_PRIMARY_KEY         =  @_PRIMARY_KEY      OUTPUT
        , @id_nid_key           =  @id_nid_key       

        , @dtt_request          = @dtt_request         
        , @dtt_response         = @dtt_response        
        , @is_valid_req         = @is_valid_req        
        , @int_data_source      = @int_data_source     
        , @is_success_req       = @is_success_req      
        , @int_match_percentage = @int_match_percentage
        , @tx_comments          = @tx_comments
        , @tx_call_back_url     = @tx_call_back_url 

      _RETURN_IF_SP_ERROR(UPD_nid_request) 
  }

	_SP_FOOTER
}
go

_GRANT_PERM_SP