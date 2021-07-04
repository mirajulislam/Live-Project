/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Mirajul-slam
* Date          : 11 MAR 2021
* Description   : 
*****************************************************************************************/

#include <nSMART_SQL.h>

#define _SP_NAME		{ACT_nid_information};
#define _TABLE_NAME		{T_NID_INFORMATION};
#define _PRIMARY_KEY	{id_nid_information_key};
#define _VERSION		{id_nid_information_ver};

_DROP_PROC

_CREATE_PROC (_SP_NAME)
    
    _SP_PARAM_HEADER

	, _PRIMARY_KEY                      INT                     = NULL      OUTPUT
    , _VERSION                          INT                     = NULL      OUTPUT
    , @id_nid_request_key                INT                     = NULL      OUTPUT
    , @tx_nid                            NVARCHAR(256)            = NULL
    , @tx_nid_pin                        NVARCHAR(256)            = NULL
    , @tx_name_bangla                    NVARCHAR(256)            = NULL
    , @tx_name_english                   NVARCHAR(256)            = NULL
    , @dtt_dob                           DATE                    = NULL
    , @tx_father_name                    NVARCHAR(128)           = NULL
    , @tx_mother_name                    NVARCHAR(128)           = NULL
    , @tx_spouse_name                    NVARCHAR(128)           = NULL
    , @tx_occupation_name                NVARCHAR(256)            = NULL
    , @tx_present_district               NVARCHAR(256)            = NULL
    , @tx_present_division               NVARCHAR(256)            = NULL
    , @tx_present_rmo                    NVARCHAR(256)            = NULL
    , @tx_present_municipality           NVARCHAR(256)            = NULL
    , @tx_present_upozila                NVARCHAR(256)            = NULL
    , @tx_present_union                  NVARCHAR(256)            = NULL
    , @tx_present_moholla                NVARCHAR(256)            = NULL
    , @tx_present_add_moholla            NVARCHAR(256)            = NULL
    , @tx_present_ward_union_porishod    NVARCHAR(256)            = NULL
    , @tx_present_village                NVARCHAR(256)            = NULL
    , @tx_present_add_village            NVARCHAR(256)            = NULL
    , @tx_present_home                   NVARCHAR(256)            = NULL
    , @tx_present_post_office            NVARCHAR(256)            = NULL
    , @tx_present_postal_code            NVARCHAR(256)            = NULL
    , @tx_present_region                 NVARCHAR(256)            = NULL
    , @tx_permanent_district             NVARCHAR(256)            = NULL
    , @tx_permanent_division             NVARCHAR(256)            = NULL
    , @tx_permanent_rmo                  NVARCHAR(256)            = NULL
    , @tx_permanent_municipality         NVARCHAR(256)            = NULL
    , @tx_permanent_upozila              NVARCHAR(256)            = NULL
    , @tx_permanent_union                NVARCHAR(256)            = NULL
    , @tx_permanent_moholla              NVARCHAR(256)            = NULL
    , @tx_permanent_add_moholla          NVARCHAR(256)            = NULL
    , @tx_permanent_ward_union_porishod  NVARCHAR(256)            = NULL
    , @tx_permanent_village              NVARCHAR(256)            = NULL
    , @tx_permanent_add_village          NVARCHAR(256)            = NULL
    , @tx_permanent_home                 NVARCHAR(256)            = NULL
    , @tx_permanent_post_office          NVARCHAR(256)            = NULL
    , @tx_permanent_postal_code          NVARCHAR(256)            = NULL
    , @tx_permanent_region               NVARCHAR(256)            = NULL
    , @tx_blood_group                    NVARCHAR(256)            = NULL
    , @tx_request_id                     NVARCHAR(256)            = NULL
    , @tx_nid_image_path                 NVARCHAR(256)            = NULL
    , @tx_nid_image_name                 NVARCHAR(256)            = NULL
    , @tx_person_image_path              NVARCHAR(256)            = NULL
    , @tx_person_image_name              NVARCHAR(256)            = NULL
    , @tx_nid_image_public_path          NVARCHAR(256)            = NULL
    , @tx_person_image_public_path       NVARCHAR(256)            = NULL
    , @dtt_extract_time                  DATETIME                = NULL
    , @tx_searchDateOfBirth              VARCHAR(256)             = NULL

    _SP_PARAM_FOOTER

AS

{
	_SP_HEADER

    IF ( @tx_action_name = 'NEW' )
    {
        INSERT INTO _TABLE_NAME
           (
             id_nid_information_ver
            ,_TABLE_HEADER_INS_FIELD_WITH_STATE
            , id_nid_request_key             
            , tx_nid                            
            , tx_nid_pin                        
            , tx_name_bangla                    
            , tx_name_english                   
            , dtt_dob                           
            , tx_father_name                    
            , tx_mother_name                    
            , tx_spouse_name                    
            , tx_occupation_name                
            , tx_present_district               
            , tx_present_division               
            , tx_present_rmo                    
            , tx_present_municipality           
            , tx_present_upozila                
            , tx_present_union                  
            , tx_present_moholla                
            , tx_present_add_moholla            
            , tx_present_ward_union_porishod    
            , tx_present_village                
            , tx_present_add_village            
            , tx_present_home                   
            , tx_present_post_office            
            , tx_present_postal_code            
            , tx_present_region                 
            , tx_permanent_district             
            , tx_permanent_division             
            , tx_permanent_rmo                  
            , tx_permanent_municipality         
            , tx_permanent_upozila              
            , tx_permanent_union                
            , tx_permanent_moholla              
            , tx_permanent_add_moholla          
            , tx_permanent_ward_union_porishod  
            , tx_permanent_village              
            , tx_permanent_add_village          
            , tx_permanent_home                 
            , tx_permanent_post_office          
            , tx_permanent_postal_code          
            , tx_permanent_region               
            , tx_blood_group                    
            , tx_request_id                     
            , tx_nid_image_path                 
            , tx_nid_image_name                 
            , tx_person_image_path              
            , tx_person_image_name              
            , tx_nid_image_public_path          
            , tx_person_image_public_path       
            , dtt_extract_time                    
           )
           VALUES
           (  
             @_VERSION
            ,_TABLE_HEADER_INS_VAL_WITH_STATE
            ,ISNULL(@id_nid_request_key             , _DB_NULL_INT)
            ,ISNULL(@tx_nid                            , _DB_NULL_STR)
            ,ISNULL(@tx_nid_pin                        , _DB_NULL_STR)
            ,ISNULL(@tx_name_bangla                    , _DB_NULL_STR)
            ,ISNULL(@tx_name_english                   , _DB_NULL_STR)
            ,ISNULL(@dtt_dob                           , _DB_NULL_DATE)
            ,ISNULL(@tx_father_name                    , _DB_NULL_STR)
            ,ISNULL(@tx_mother_name                    , _DB_NULL_STR)
            ,ISNULL(@tx_spouse_name                    , _DB_NULL_STR)
            ,ISNULL(@tx_occupation_name                , _DB_NULL_STR)
            ,ISNULL(@tx_present_district               , _DB_NULL_STR)
            ,ISNULL(@tx_present_division               , _DB_NULL_STR)
            ,ISNULL(@tx_present_rmo                    , _DB_NULL_STR)
            ,ISNULL(@tx_present_municipality           , _DB_NULL_STR)
            ,ISNULL(@tx_present_upozila                , _DB_NULL_STR)
            ,ISNULL(@tx_present_union                  , _DB_NULL_STR)
            ,ISNULL(@tx_present_moholla                , _DB_NULL_STR)
            ,ISNULL(@tx_present_add_moholla            , _DB_NULL_STR)
            ,ISNULL(@tx_present_ward_union_porishod    , _DB_NULL_STR)
            ,ISNULL(@tx_present_village                , _DB_NULL_STR)
            ,ISNULL(@tx_present_add_village            , _DB_NULL_STR)
            ,ISNULL(@tx_present_home                   , _DB_NULL_STR)
            ,ISNULL(@tx_present_post_office            , _DB_NULL_STR)
            ,ISNULL(@tx_present_postal_code            , _DB_NULL_STR)
            ,ISNULL(@tx_present_region                 , _DB_NULL_STR)
            ,ISNULL(@tx_permanent_district             , _DB_NULL_STR)
            ,ISNULL(@tx_permanent_division             , _DB_NULL_STR)
            ,ISNULL(@tx_permanent_rmo                  , _DB_NULL_STR)
            ,ISNULL(@tx_permanent_municipality         , _DB_NULL_STR)
            ,ISNULL(@tx_permanent_upozila              , _DB_NULL_STR)
            ,ISNULL(@tx_permanent_union                , _DB_NULL_STR)
            ,ISNULL(@tx_permanent_moholla              , _DB_NULL_STR)
            ,ISNULL(@tx_permanent_add_moholla          , _DB_NULL_STR)
            ,ISNULL(@tx_permanent_ward_union_porishod  , _DB_NULL_STR)
            ,ISNULL(@tx_permanent_village              , _DB_NULL_STR)
            ,ISNULL(@tx_permanent_add_village          , _DB_NULL_STR)
            ,ISNULL(@tx_permanent_home                 , _DB_NULL_STR)
            ,ISNULL(@tx_permanent_post_office          , _DB_NULL_STR)
            ,ISNULL(@tx_permanent_postal_code          , _DB_NULL_STR)
            ,ISNULL(@tx_permanent_region               , _DB_NULL_STR)
            ,ISNULL(@tx_blood_group                    , _DB_NULL_STR)
            ,ISNULL(@tx_request_id                     , _DB_NULL_STR)
            ,ISNULL(@tx_nid_image_path                 , _DB_NULL_STR)
            ,ISNULL(@tx_nid_image_name                 , _DB_NULL_STR)
            ,ISNULL(@tx_person_image_path              , _DB_NULL_STR)
            ,ISNULL(@tx_person_image_name              , _DB_NULL_STR)
            ,ISNULL(@tx_nid_image_public_path          , _DB_NULL_STR)
            ,ISNULL(@tx_person_image_public_path       , _DB_NULL_STR)
            ,ISNULL(@dtt_extract_time                  , _DB_NULL_DATE)
            )

        SELECT @_PRIMARY_KEY = IDENT_CURRENT('T_NID_INFORMATION')
    }
    IF ( @tx_action_name = _ACTION_SELECT )
    {
            SELECT  tx_rs_type = 'RS_TYPE_NID'
             , N.*
             FROM  _TABLE_NAME N
             WHERE  tx_nid                          = @tx_nid
             AND    CAST(dtt_dob AS DATE)           = CAST(@dtt_dob AS DATE)
             AND    is_active                       = 1
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
            , id_nid_information_ver    = @id_nid_information_ver + 1
            , id_nid_request_key        = ISNULL(@id_nid_request_key, id_nid_request_key)
            , tx_nid                    = ISNULL(@tx_nid, tx_nid)
            , tx_nid_pin                = ISNULL(@tx_nid_pin, tx_nid_pin)
            , tx_name_bangla            = ISNULL(@tx_name_bangla, tx_name_bangla)
            , tx_name_english           = ISNULL(@tx_name_english, tx_name_english)
            , dtt_dob                   = ISNULL(@dtt_dob, dtt_dob)
            , tx_father_name            = ISNULL(@tx_father_name, tx_father_name)
            , tx_mother_name            = ISNULL(@tx_mother_name, tx_mother_name)
            , tx_spouse_name            = ISNULL(@tx_spouse_name, tx_spouse_name)
            , tx_occupation_name        = ISNULL(@tx_occupation_name, tx_occupation_name)
            , tx_present_district       = ISNULL(@tx_present_district, tx_present_district)
            , tx_present_division       = ISNULL(@tx_present_division, tx_present_division)
            , tx_present_rmo            = ISNULL(@tx_present_rmo, tx_present_rmo)
            , tx_present_upozila        = ISNULL(@tx_present_upozila, tx_present_upozila)
            , tx_present_union          = ISNULL(@tx_present_union, tx_present_union)
            , tx_present_moholla        = ISNULL(@tx_present_moholla, tx_present_moholla)
            , tx_present_add_moholla    = ISNULL(@tx_present_add_moholla, tx_present_add_moholla)
            , tx_present_village        = ISNULL(@tx_present_village, tx_present_village)
            , tx_present_add_village    = ISNULL(@tx_present_add_village, tx_present_add_village)
            , tx_present_home           = ISNULL(@tx_present_home, tx_present_home)
            , tx_present_post_office    = ISNULL(@tx_present_post_office, tx_present_post_office)
            , tx_present_postal_code    = ISNULL(@tx_present_postal_code, tx_present_postal_code)
            , tx_present_region         = ISNULL(@tx_present_region, tx_present_region)
            , tx_permanent_district     = ISNULL(@tx_permanent_district, tx_permanent_district)
            , tx_permanent_division     = ISNULL(@tx_permanent_division, tx_permanent_division)
            , tx_permanent_rmo          = ISNULL(@tx_permanent_rmo, tx_permanent_rmo)
            , tx_permanent_upozila      = ISNULL(@tx_permanent_upozila, tx_permanent_upozila)
            , tx_permanent_union        = ISNULL(@tx_permanent_union, tx_permanent_union)
            , tx_permanent_moholla      = ISNULL(@tx_permanent_moholla, tx_permanent_moholla)
            , tx_permanent_region       = ISNULL(@tx_permanent_region, tx_permanent_region)
            , tx_blood_group            = ISNULL(@tx_blood_group, tx_blood_group)
            , tx_request_id             = ISNULL(@tx_request_id, tx_request_id)
            , tx_nid_image_path         = ISNULL(@tx_nid_image_path, tx_nid_image_path)
            , tx_nid_image_name         = ISNULL(@tx_nid_image_name, tx_nid_image_name)
            , tx_person_image_path      = ISNULL(@tx_person_image_path, tx_person_image_path)
            , tx_person_image_name      = ISNULL(@tx_person_image_name, tx_person_image_name)
            , dtt_extract_time          = ISNULL(@dtt_extract_time, dtt_extract_time)
            , tx_permanent_village      = ISNULL(@tx_permanent_village, tx_permanent_village)
            , tx_permanent_home         = ISNULL(@tx_permanent_home, tx_permanent_home)

            , tx_present_municipality   = ISNULL(@tx_present_municipality, tx_present_municipality)
            , tx_present_ward_union_porishod    = ISNULL(@tx_present_ward_union_porishod    , tx_present_ward_union_porishod)
            , tx_permanent_municipality = ISNULL(@tx_permanent_municipality, tx_permanent_municipality)
            , tx_permanent_add_moholla  = ISNULL(@tx_permanent_add_moholla, tx_permanent_add_moholla)
            , tx_permanent_ward_union_porishod  = ISNULL(@tx_permanent_ward_union_porishod, tx_permanent_ward_union_porishod)
            , tx_permanent_add_village  = ISNULL(@tx_permanent_add_village, tx_permanent_add_village)
            , tx_permanent_post_office  = ISNULL(@tx_permanent_post_office, tx_permanent_post_office)
            , tx_permanent_postal_code  = ISNULL(@tx_permanent_postal_code, tx_permanent_postal_code)
            , tx_nid_image_public_path  = ISNULL(@tx_nid_image_public_path, tx_nid_image_public_path)
            , tx_person_image_public_path   = ISNULL(@tx_person_image_public_path, tx_person_image_public_path)
        WHERE tx_nid    = @tx_nid         
        AND   dtt_dob   = @dtt_dob
    }

    IF( @tx_action_name = 'SEARCH_NID_DETAILS_FOR_COMPARE' or @tx_action_name = 'SEARCH_NID_DETAILS_FORM_API')
      {
        SELECT  tx_rs_type = 'RS_TYPE_NID_DETAILS' , N.* from T_NID_INFORMATION N where 
        N.dtt_dob   = ISNULL(CAST(@tx_searchDateOfBirth AS DATE)  ,N.dtt_dob)
        AND N.tx_nid          = ISNULL(@tx_nid        ,N.tx_nid)
      }
    IF(@tx_action_name = 'SEARCH_FOR_CUSTOMER_NID_DETAILS')  
    {
        select tx_rs_type = 'RS_TYPE_NID_DETAILS', TN.* from T_NID_INFORMATION TN 
        where TN.tx_nid = ISNULL(@tx_nid        ,TN.tx_nid)
        AND CAST(TN.dtt_dob AS DATE) <= ISNULL(CAST(@tx_searchDateOfBirth AS DATE)  ,TN.dtt_dob)
    }
	_SP_FOOTER
}
go

_GRANT_PERM_SP