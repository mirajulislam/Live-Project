/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Fahim Reza & Kh. Assaduzzaman Sohan
* Date          : 5 DEC 2019
* Description   : Select all information from T_NID
*****************************************************************************************/

#include <nSMART_SQL.h>

#define _SP_NAME		{SEL_nid};
#define _TABLE_NAME		{T_NID};
#define _PRIMARY_KEY	{id_nid_key};
#define _VERSION		{id_nid_ver};

_DROP_PROC

_CREATE_PROC (_SP_NAME)
    
    _SP_PARAM_HEADER

	, @_PRIMARY_KEY					int							= NULL		
	, @_VERSION						int							= NULL		

	, @id_nid_request_key           int                         = NULL

   	, @tx_nid						varchar(16)                 = NULL
    , @dtt_dob                      DATETIME                    = NULL
    , @tx_father_name               nvarchar(128)               = NULL
    , @tx_mother_name               nvarchar(128)               = NULL
    , @tx_blood_group				nvarchar(4)                 = NULL
    , @tx_addr_line_1				nvarchar(128)               = NULL
	, @tx_addr_line_2				nvarchar(128)               = NULL
	, @tx_name						nvarchar(128)				= NULL
	, @tx_post_office				nvarchar(128)				= NULL
	, @int_post_code				int					        = NULL
	, @tx_police_station			nvarchar(64)				= NULL
	, @tx_district					nvarchar(64)				= NULL
	, @tx_division					nvarchar(64)				= NULL
	, @dtt_nid_issue_date			DATETIME                    = NULL
	, @dtt_extract_time				DATETIME					= NULL
	, @int_nid_source				int 					    = NULL 
	, @dtt_request					DATETIME					= NULL
	, @dtt_response					DATETIME					= NULL
	, @int_match_percentage			int				            = NULL
	, @tx_nid_image_path 			varchar(256)				= NULL
	, @tx_nid_image_name			varchar(128)				= NULL
    , @tx_nid_person_image_path     varchar(256)                = NULL
    , @tx_nid_person_image_name     varchar(128)                = NULL
    , @int_success                  int                         = NULL


	_SP_PARAM_FOOTER

AS

{
	_SP_SEL_HEADER

         SELECT  tx_rs_type = 'RS_TYPE_NID'
         , N.*
         FROM  _TABLE_NAME N
         WHERE 	tx_nid         					= @tx_nid
         AND   	cast(dtt_dob as date)        	= cast(@dtt_dob as date)
         AND   	is_active      					= 1

	_SP_FOOTER
}
go

_GRANT_PERM_SP