/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Fahim Reza & Kh. Assaduzzaman Sohan
* Date          : 5 DEC 2019
* Description   : Update NID information of T_NID
*****************************************************************************************/

#include <nSMART_SQL.h>

#define _SP_NAME		{UPD_nid};
#define _TABLE_NAME		{T_NID};
#define _PRIMARY_KEY	{id_nid_key};
#define _VERSION		{id_nid_ver};

_DROP_PROC

_CREATE_PROC (_SP_NAME)

	_SP_PARAM_HEADER

  , @_PRIMARY_KEY                 int                 = NULL   OUTPUT 
  , @_VERSION                     int                 = NULL    

  , @id_nid_request_key           int                 = NULL   OUTPUT

  , @tx_nid                       varchar(16)         = NULL
  , @dtt_dob                      DATETIME            = NULL
  , @tx_father_name               nvarchar(128)       = NULL
  , @tx_mother_name               nvarchar(128)       = NULL
  , @tx_blood_group               nvarchar(4)         = NULL
  , @tx_addr_line_1               nvarchar(128)       = NULL
  , @tx_addr_line_2               nvarchar(128)       = NULL
  , @tx_name                      nvarchar(128)       = NULL
  , @tx_post_office               nvarchar(128)       = NULL
  , @int_post_code                int                 = NULL
  , @tx_police_station            nvarchar(64)        = NULL
  , @tx_district                  nvarchar(64)        = NULL
  , @tx_division                  nvarchar(64)        = NULL
  , @dtt_nid_issue_date           DATETIME            = NULL
  , @dtt_extract_time             DATETIME            = NULL
  , @int_nid_source               int                 = NULL 
  , @dtt_request                  DATETIME            = NULL
  , @dtt_response                 DATETIME            = NULL
  , @int_match_percentage         int                 = NULL
  , @tx_nid_image_path            varchar(256)        = NULL
  , @tx_nid_image_name            varchar(128)        = NULL
  , @tx_nid_person_image_path     varchar(256)        = NULL
  , @tx_nid_person_image_name     varchar(128)        = NULL
  , @int_success                  int                 = NULL


  _SP_PARAM_FOOTER

AS

{
	_SP_HEADER

	_BEGIN_TRAN


      UPDATE _TABLE_NAME
       SET _TABLE_HEADER_UPD_WITH_STATE
          ,tx_nid                   = ISNULL(@tx_nid                   ,tx_nid) 
          ,dtt_dob                  = ISNULL(@dtt_dob                  ,dtt_dob) 
          ,tx_father_name           = ISNULL(@tx_father_name           ,tx_father_name) 
          ,tx_mother_name           = ISNULL(@tx_mother_name           ,tx_mother_name)
          ,tx_blood_group           = ISNULL(@tx_blood_group           ,tx_blood_group)
          ,tx_addr_line_1           = ISNULL(@tx_addr_line_1           ,tx_addr_line_1) 
          ,tx_addr_line_2           = ISNULL(@tx_addr_line_2           ,tx_addr_line_2) 
          ,tx_name                  = ISNULL(@tx_name                  ,tx_name) 
          ,tx_post_office           = ISNULL(@tx_post_office           ,tx_post_office) 
          ,int_post_code            = ISNULL(@int_post_code            ,int_post_code) 
          ,tx_police_station        = ISNULL(@tx_police_station        ,tx_police_station)
          ,tx_district              = ISNULL(@tx_district              ,tx_district) 
          ,tx_division              = ISNULL(@tx_division              ,tx_division) 
          ,dtt_nid_issue_date       = ISNULL(@dtt_nid_issue_date       ,dtt_nid_issue_date)
          ,dtt_extract_time         = ISNULL(@dtt_extract_time         ,dtt_extract_time) 
          ,int_nid_source           = ISNULL(@int_nid_source           ,int_nid_source) 
          ,dtt_request              = ISNULL(@dtt_request              ,dtt_request) 
          ,dtt_response             = ISNULL(@dtt_response             ,dtt_response) 
          ,int_match_percentage     = ISNULL(@int_match_percentage     ,int_match_percentage)
          ,tx_nid_image_path        = ISNULL(@tx_nid_image_path        ,tx_nid_image_path) 
          ,tx_nid_image_name        = ISNULL(@tx_nid_image_name        ,tx_nid_image_name)
          ,tx_nid_person_image_path = ISNULL(@tx_nid_person_image_path ,tx_nid_person_image_path) 
          ,tx_nid_person_image_name = ISNULL(@tx_nid_person_image_name ,tx_nid_person_image_name) 
          ,int_success              = ISNULL(@int_success ,int_success) 

        WHERE tx_nid    = @tx_nid         
        AND   dtt_dob   = @dtt_dob
        AND   is_active = 1

			_TOUCHED_TABLE(_TABLE_NAME)

		_COMMIT_TRAN

	_SP_FOOTER

	RETURN _STATUS_OK
}
go

_GRANT_PERM_SP