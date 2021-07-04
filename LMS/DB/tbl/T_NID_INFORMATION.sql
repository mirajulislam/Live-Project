/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Mirajul-islam
* Date          : 11 MAR 2021
* Description   : Table for NID information
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _TABLE_NAME 		{T_NID_INFORMATION};
#define _PRIMARY_KEY		{id_nid_information_key};
#define _VERSION			{id_nid_information_ver};

_DROP_TABLE

_CREATE_TABLE(_TABLE_NAME )

(
	  _PRIMARY_KEY					INT	IDENTITY(100000,1)		NOT NULL
	, _VERSION					  	INT						    
	, _TABLE_HEADER_WITH_STATE

    , id_nid_request_key				INT                    		
    , tx_nid							NVARCHAR(256)                
    , tx_nid_pin						NVARCHAR(256)                
    , tx_name_bangla					NVARCHAR(256)                
    , tx_name_english					NVARCHAR(256)                
    , dtt_dob                       	DATE                        
    , tx_father_name                	NVARCHAR(256)               
    , tx_mother_name                	NVARCHAR(256)               
    , tx_spouse_name                	NVARCHAR(256)               
	, tx_occupation_name 				NVARCHAR(256)               
	, tx_present_district 				NVARCHAR(256)               
	, tx_present_division 				NVARCHAR(256)               
	, tx_present_rmo 					NVARCHAR(256)               
	, tx_present_municipality 			NVARCHAR(256)               
	, tx_present_upozila 				NVARCHAR(256)               
	, tx_present_union 					NVARCHAR(256)               
	, tx_present_moholla 				NVARCHAR(256)               
	, tx_present_add_moholla 			NVARCHAR(256)               
	, tx_present_ward_union_porishod 	NVARCHAR(256)               
	, tx_present_village 				NVARCHAR(256)               
	, tx_present_add_village 			NVARCHAR(256)               
	, tx_present_home 					NVARCHAR(256)               
	, tx_present_post_office 			NVARCHAR(256)               
	, tx_present_postal_code 			NVARCHAR(256)               
	, tx_present_region 				NVARCHAR(256)               
	, tx_permanent_district 			NVARCHAR(256)               
	, tx_permanent_division 			NVARCHAR(256)               
	, tx_permanent_rmo 					NVARCHAR(256)               
	, tx_permanent_municipality 		NVARCHAR(256)               
	, tx_permanent_upozila 				NVARCHAR(256)               
	, tx_permanent_union 				NVARCHAR(256)               
	, tx_permanent_moholla 				NVARCHAR(256)               
	, tx_permanent_add_moholla 			NVARCHAR(256)               
	, tx_permanent_ward_union_porishod 	NVARCHAR(256)               
	, tx_permanent_village 				NVARCHAR(256)               
	, tx_permanent_add_village 			NVARCHAR(256)               
	, tx_permanent_home 				NVARCHAR(256)               
	, tx_permanent_post_office 			NVARCHAR(256)               
	, tx_permanent_postal_code 			NVARCHAR(256)               
	, tx_permanent_region 				NVARCHAR(256)               
	, tx_blood_group 					NVARCHAR(256)               
	, tx_request_id 					NVARCHAR(256)               
	, tx_nid_image_path 				NVARCHAR(256)               
	, tx_nid_image_name 				NVARCHAR(256)               
	, tx_person_image_path 				NVARCHAR(256)               
	, tx_person_image_name 				NVARCHAR(256)               
	, tx_nid_image_public_path 			NVARCHAR(256)               
	, tx_person_image_public_path 		NVARCHAR(256)               
	, dtt_extract_time					DATETIME
    , CONSTRAINT pk_id_nid_information_key PRIMARY KEY CLUSTERED(_PRIMARY_KEY)

)

go

CREATE UNIQUE INDEX idx_tx_nid_information_v2
	ON T_NID_INFORMATION(tx_nid, dtt_dob)
go

_GRANT_PERM_TBL