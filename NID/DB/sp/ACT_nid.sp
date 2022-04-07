/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Fahim Reza & Kh. Assaduzzaman Sohan
* Date          : 5 DEC 2019
* Description   : 
*****************************************************************************************/

#include <nSMART_SQL.h>

#define _SP_NAME		{ACT_nid};
#define _TABLE_NAME		{T_NID};
#define _PRIMARY_KEY	{id_nid_key};
#define _VERSION		{id_nid_ver};

_DROP_PROC

_CREATE_PROC (_SP_NAME)
    
    _SP_PARAM_HEADER

	, @_PRIMARY_KEY					             int							            = NULL		OUTPUT
	, @_VERSION						               int							            = NULL	

  , @id_nid_request_key                int                          = NULL      OUTPUT    

  , @tx_nid						                 varchar(16)                  = NULL
  , @dtt_dob                           DATETIME                     = NULL
  , @tx_father_name                    nvarchar(128)                = NULL
  , @tx_mother_name                    nvarchar(128)                = NULL
  , @tx_blood_group				             nvarchar(4)                  = NULL
  , @tx_addr_line_1				             nvarchar(128)                = NULL
	, @tx_addr_line_2				             nvarchar(128)                = NULL
	, @tx_name						               nvarchar(128)				        = NULL
	, @tx_post_office				             nvarchar(128)				        = NULL
	, @int_post_code				             int					                = NULL
	, @tx_police_station		             nvarchar(64)				          = NULL
	, @tx_district					             nvarchar(64)				          = NULL
	, @tx_division					             nvarchar(64)				          = NULL
	, @dtt_nid_issue_date			           DATETIME                     = NULL
	, @dtt_extract_time				           DATETIME					            = NULL
	, @int_nid_source				             int 					                = NULL 
	, @dtt_request					             DATETIME					            = NULL
	, @dtt_response					             DATETIME					            = NULL
	, @int_match_percentage			         int				                  = NULL
	, @tx_nid_image_path 			           varchar(256)				          = NULL
	, @tx_nid_image_name			           varchar(128)				          = NULL
  , @tx_nid_person_image_path          varchar(256)                 = NULL
  , @tx_nid_person_image_name          varchar(128)                 = NULL
  , @int_success                       int                          = NULL
  , @dtt_to_date                       DATETIME                     = NULL
  , @dtt_form_date                     DATETIME                     = NULL

    _SP_PARAM_FOOTER

AS

{
	_SP_HEADER

  IF ( @tx_action_name = 'SELECT_HISTORY')
  {
    SELECT  tx_rs_type = 'RS_TYPE_SELECT_REQUEST_HISTORY' ,
        NR.dtt_request ,
        NR.is_success_req AS int_success,
        NR.int_data_source AS int_nid_source,
        N.dtt_extract_time ,
        N.tx_nid ,
        N.dtt_dob
    FROM T_NID_REQUEST NR
    JOIN T_NID N ON NR.id_nid_key = N.id_nid_key
    WHERE N.tx_nid = @tx_nid
    AND N.dtt_dob = @dtt_dob
    AND NR.dtt_request >= @dtt_form_date
    AND NR.dtt_request <= @dtt_to_date   
  }
    
  IF ( @tx_action_name = _ACTION_NEW )
  {
      EXEC @g_id_return_status = INS_nid

         _SP_ARGS_HEADER
        , @_PRIMARY_KEY             =  @_PRIMARY_KEY      OUTPUT
        , @_VERSION                 =  @_VERSION 

        , @id_nid_request_key       =  @id_nid_request_key OUTPUT    
    
        , @tx_nid                   =  @tx_nid       
        , @dtt_dob                  =  @dtt_dob               
        , @tx_father_name           =  @tx_father_name       
        , @tx_mother_name           =  @tx_mother_name       
        , @tx_blood_group           =  @tx_blood_group   
        , @tx_addr_line_1           =  @tx_addr_line_1   
        , @tx_addr_line_2           =  @tx_addr_line_2   
        , @tx_name                  =  @tx_name        
        , @tx_post_office           =  @tx_post_office   
        , @int_post_code            =  @int_post_code      
        , @tx_police_station        =  @tx_police_station    
        , @tx_district              =  @tx_district      
        , @tx_division              =  @tx_division      
        , @dtt_nid_issue_date       =  @dtt_nid_issue_date    
        , @dtt_extract_time         =  @dtt_extract_time   
        , @int_nid_source           =  @int_nid_source    
        , @dtt_request              =  @dtt_request      
        , @dtt_response             =  @dtt_response     
        , @int_match_percentage     =  @int_match_percentage
        , @tx_nid_image_path        =  @tx_nid_image_path  
        , @tx_nid_image_name        =  @tx_nid_image_name 
        , @tx_nid_person_image_path =  @tx_nid_person_image_path  
        , @tx_nid_person_image_name =  @tx_nid_person_image_name  
        , @int_success              =  @int_success  

        _RETURN_IF_SP_ERROR(INS_nid)
  }
  IF ( @tx_action_name = _ACTION_SELECT )
  {

        EXEC @g_id_return_status = SEL_nid
         
         _SP_ARGS_HEADER
        , @_PRIMARY_KEY             =  @_PRIMARY_KEY      
        , @_VERSION                 =  @_VERSION  

        , @id_nid_request_key       =  @id_nid_request_key        
    
        , @tx_nid                   =  @tx_nid       
        , @dtt_dob                  =  @dtt_dob               
        , @tx_father_name           =  @tx_father_name       
        , @tx_mother_name           =  @tx_mother_name       
        , @tx_blood_group           =  @tx_blood_group   
        , @tx_addr_line_1           =  @tx_addr_line_1   
        , @tx_addr_line_2           =  @tx_addr_line_2   
        , @tx_name                  =  @tx_name        
        , @tx_post_office           =  @tx_post_office   
        , @int_post_code            =  @int_post_code      
        , @tx_police_station        =  @tx_police_station    
        , @tx_district              =  @tx_district      
        , @tx_division              =  @tx_division      
        , @dtt_nid_issue_date       =  @dtt_nid_issue_date    
        , @dtt_extract_time         =  @dtt_extract_time   
        , @int_nid_source           =  @int_nid_source    
        , @dtt_request              =  @dtt_request      
        , @dtt_response             =  @dtt_response     
        , @int_match_percentage     =  @int_match_percentage
        , @tx_nid_image_path        =  @tx_nid_image_path  
        , @tx_nid_image_name        =  @tx_nid_image_name 
        , @tx_nid_person_image_path =  @tx_nid_person_image_path  
        , @tx_nid_person_image_name =  @tx_nid_person_image_name
        , @int_success              =  @int_success    

    _RETURN_IF_SP_ERROR(SEL_nid)
  }

  IF (@tx_action_name = _ACTION_DELETE)
  { 
    _SET_ACTION(_ACTION_UPDATE)
    , @is_active = 0
  }

  IF( @tx_action_name = _ACTION_UPDATE )
  {
        EXEC @g_id_return_status = UPD_nid

         _SP_ARGS_HEADER
        , @_PRIMARY_KEY             =  @_PRIMARY_KEY     OUTPUT 
        , @_VERSION                 =  @_VERSION        
        
        , @id_nid_request_key       =  @id_nid_request_key OUTPUT

        , @tx_nid                   =  @tx_nid       
        , @dtt_dob                  =  @dtt_dob               
        , @tx_father_name           =  @tx_father_name       
        , @tx_mother_name           =  @tx_mother_name       
        , @tx_blood_group           =  @tx_blood_group   
        , @tx_addr_line_1           =  @tx_addr_line_1   
        , @tx_addr_line_2           =  @tx_addr_line_2   
        , @tx_name                  =  @tx_name        
        , @tx_post_office           =  @tx_post_office   
        , @int_post_code            =  @int_post_code      
        , @tx_police_station        =  @tx_police_station    
        , @tx_district              =  @tx_district      
        , @tx_division              =  @tx_division      
        , @dtt_nid_issue_date       =  @dtt_nid_issue_date    
        , @dtt_extract_time         =  @dtt_extract_time   
        , @int_nid_source           =  @int_nid_source    
        , @dtt_request              =  @dtt_request      
        , @dtt_response             =  @dtt_response     
        , @int_match_percentage     =  @int_match_percentage
        , @tx_nid_image_path        =  @tx_nid_image_path  
        , @tx_nid_image_name        =  @tx_nid_image_name 
        , @tx_nid_person_image_path =  @tx_nid_person_image_path  
        , @tx_nid_person_image_name =  @tx_nid_person_image_name
        , @int_success              =  @int_success  

      _RETURN_IF_SP_ERROR(UPD_nid) 
  }
	_SP_FOOTER
}
go

_GRANT_PERM_SP