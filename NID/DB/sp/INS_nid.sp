/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Fahim Reza & Kh. Assaduzzaman Sohan
* Date          : 5 DEC 2019
* Description   : Insert NID information in T_NID
*****************************************************************************************/

#include <nSMART_SQL.h>

#define _SP_NAME		  {INS_nid};
#define _TABLE_NAME		{T_NID};
#define _PRIMARY_KEY	{id_nid_key};
#define _VERSION		  {id_nid_ver};

_DROP_PROC

_CREATE_PROC (_SP_NAME)

    _SP_PARAM_HEADER

    , @_PRIMARY_KEY                 int                 = NULL    OUTPUT   
    , @_VERSION                     int                 = NULL 

    , @id_nid_request_key           int                 = NULL    OUTPUT

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

	_INIT_VERSION(@_VERSION)

	_BEGIN_TRAN

	INSERT INTO _TABLE_NAME
           (
            id_nid_ver
           ,_TABLE_HEADER_INS_FIELD_WITH_STATE
           
           ,id_nid_request_key

           ,tx_nid
           ,dtt_dob
           ,tx_father_name
           ,tx_mother_name
           ,tx_blood_group
           ,tx_addr_line_1
           ,tx_addr_line_2
           ,tx_name
           ,tx_post_office
           ,int_post_code
           ,tx_police_station
           ,tx_district
           ,tx_division
           ,dtt_nid_issue_date
           ,dtt_extract_time
           ,int_nid_source
           ,dtt_request
           ,dtt_response
           ,int_match_percentage
           ,tx_nid_image_path
           ,tx_nid_image_name
           ,tx_nid_person_image_path      
           ,tx_nid_person_image_name   
           ,int_success   
           )
           VALUES
           (  
            @_VERSION
           ,_TABLE_HEADER_INS_VAL_WITH_STATE

           ,ISNULL(@id_nid_request_key        , _DB_NULL_INT)

           ,ISNULL(@tx_nid                    , _DB_NULL_STR)
           ,ISNULL(@dtt_dob                   , _DB_NULL_DATE)
           ,ISNULL(@tx_father_name            , _DB_NULL_STR)
           ,ISNULL(@tx_mother_name            , _DB_NULL_STR)
           ,ISNULL(@tx_blood_group            , _DB_NULL_STR)
           ,ISNULL(@tx_addr_line_1            , _DB_NULL_STR)
           ,ISNULL(@tx_addr_line_2            , _DB_NULL_STR)
           ,ISNULL(@tx_name                   , _DB_NULL_STR)
           ,ISNULL(@tx_post_office            , _DB_NULL_STR)
           ,ISNULL(@int_post_code             , _DB_NULL_INT)
           ,ISNULL(@tx_police_station         , _DB_NULL_STR)
           ,ISNULL(@tx_district               , _DB_NULL_STR)
           ,ISNULL(@tx_division               , _DB_NULL_STR)
           ,ISNULL(@dtt_nid_issue_date        , _DB_NULL_DATE)
           ,ISNULL(@dtt_extract_time          , _DB_NULL_DATE)
           ,ISNULL(@int_nid_source            , _DB_NULL_INT)
           ,ISNULL(@dtt_request               , _DB_NULL_DATE)
           ,ISNULL(@dtt_response              , _DB_NULL_DATE)
           ,ISNULL(@int_match_percentage      , _DB_NULL_INT)
           ,ISNULL(@tx_nid_image_path         , _DB_NULL_STR)
           ,ISNULL(@tx_nid_image_name         , _DB_NULL_STR)
           ,ISNULL(@tx_nid_person_image_path  , _DB_NULL_STR)
           ,ISNULL(@tx_nid_person_image_name  , _DB_NULL_STR)
           ,ISNULL(@int_success               , _DB_NULL_INT)
           )

           SELECT @_PRIMARY_KEY = IDENT_CURRENT('T_NID')

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