/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Mirajul-islam
* Date          : 21 March 2022
* Description   : 
*****************************************************************************************/

#include <nSMART_SQL.h>

#define _SP_NAME		  {ACT_search_nid};
#define _TABLE_NAME		{T_NID_SEARCH};
#define _PRIMARY_KEY	{id_nid_search_key};
#define _VERSION		  {id_nid_search_ver};

_DROP_PROC

_CREATE_PROC (_SP_NAME)
    
    _SP_PARAM_HEADER

	, @_PRIMARY_KEY					             int							            = NULL		OUTPUT
	, @_VERSION						               int							            = NULL	

  , @tx_nid						                 varchar(16)                  = NULL
  , @dtt_dob                           DATETIME                     = NULL
  , @tx_father_name                    nvarchar(128)                = NULL
  , @tx_data_source                    varchar(128)                 = NULL
	, @tx_name						               nvarchar(128)				        = NULL
	, @tx_force_fatch				             varchar(128)				          = NULL
  , @dtt_request                       DATETIME                     = NULL

    _SP_PARAM_FOOTER

AS

{
	_SP_HEADER
    
  IF ( @tx_action_name = 'NEW_SEARCH' )
  {
      INSERT INTO _TABLE_NAME
        (     
          _VERSION                   
          , _TABLE_HEADER_INS_FIELD_WITH_STATE

          , tx_nid
          , dtt_dob
          , tx_father_name
          , tx_data_source
          , tx_name
          , tx_force_fatch
          , dtt_request 
        )
        VALUES
        (  
          @_VERSION
          ,_TABLE_HEADER_INS_VAL_WITH_STATE

          ,ISNULL(@tx_nid                    , _DB_NULL_STR)
          ,ISNULL(@dtt_dob                   , _DB_NULL_DATE)
          ,ISNULL(@tx_father_name            , _DB_NULL_STR)
          ,ISNULL(@tx_data_source            , _DB_NULL_STR)
          ,ISNULL(@tx_name                   , _DB_NULL_STR)
          ,ISNULL(@tx_force_fatch            , _DB_NULL_STR)
          ,GETDATE()
        )
  }

  IF (@tx_action_name = _ACTION_DELETE)
  { 
    _SET_ACTION(_ACTION_UPDATE)
    , @is_active = 0
  }

  IF( @tx_action_name = _ACTION_UPDATE )
  {
     UPDATE _TABLE_NAME
     SET _TABLE_HEADER_UPD_WITH_STATE
     ,tx_nid                   = ISNULL(@tx_nid                   ,tx_nid) 
     ,dtt_dob                  = ISNULL(@dtt_dob                  ,dtt_dob) 
     ,tx_father_name           = ISNULL(@tx_father_name           ,tx_father_name)
     ,tx_data_source           = ISNULL(@tx_data_source           ,tx_data_source)
     ,tx_name                  = ISNULL(@tx_name                  ,tx_name)
     ,tx_force_fatch           = ISNULL(@tx_force_fatch           ,tx_force_fatch) 
     WHERE tx_nid              = @tx_nid         
     AND   dtt_dob             = @dtt_dob
     AND   is_active           = 1
  }
	_SP_FOOTER
}
go

_GRANT_PERM_SP