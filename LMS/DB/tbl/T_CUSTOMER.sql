/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Kh. Assaduzzaman Sohan
* Date          : 24 DEC 2019
* Description   : Table for Customer information
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _TABLE_NAME 		{T_CUSTOMER};
#define _PRIMARY_KEY		{id_customer_key};
#define _VERSION			{id_customer_ver};

_DROP_TABLE

_CREATE_TABLE(_TABLE_NAME )

(
	  _PRIMARY_KEY					 	INT	IDENTITY(100000,1)		NOT NULL
	, _VERSION					  	 	INT						    NOT NULL
	, _TABLE_HEADER_WITH_STATE

	, tx_customer_id					VARCHAR(256)				NOT NULL
    , id_customer_type_key              INT                         NOT NULL

    , tx_bp_no                          VARCHAR(256)                NOT NULL
    , tx_customer_name                  VARCHAR(256)                NOT NULL
    , tx_designation                    VARCHAR(256)                NOT NULL
    , tx_current_posting_place          VARCHAR(256)                NOT NULL
    , dtt_date_of_birth                 DATETIME                        NULL
    , tx_age                            VARCHAR(256)                NOT NULL
    , dtt_joining_date                  DATETIME                        NULL
    , tx_service_length                 VARCHAR(256)                NOT NULL
    , dtt_retirement_date               DATETIME                        NULL
    , tx_remaining_year_of_retirement   VARCHAR(256)                NOT NULL
    
    , tx_nid                            VARCHAR(256)                NOT NULL
    , tx_tin                            VARCHAR(256)                NOT NULL
    , tx_account_no                     VARCHAR(256)                NOT NULL
    , int_salary_disbursed_with_cbbl    INT                         NOT NULL
    , tx_marital_status                 VARCHAR(256)                NOT NULL
    , tx_cif                            VARCHAR(256)                NOT NULL
    , tx_mother_name                    VARCHAR(256)                NOT NULL
    , tx_father_name                    VARCHAR(256)                NOT NULL
    , tx_spouse                         VARCHAR(256)                NOT NULL
    , tx_house_ownership                VARCHAR(256)                NOT NULL
    , tx_permanet_addr                  VARCHAR(256)                NOT NULL
    , tx_office_addr                    VARCHAR(256)                NOT NULL
    , tx_mobile                         VARCHAR(256)                NOT NULL
    , tx_emer_phone                     VARCHAR(256)                NOT NULL
    , tx_is_matched_nid                 VARCHAR(256)                NOT NULL
    , tx_name_in_bangla                 NVARCHAR(256)               NOT NULL
    , tx_alternative_mobile             VARCHAR(16)                 NOT NULL
    , tx_office_id                      VARCHAR(256)                NOT NULL
    , tx_district                       VARCHAR(48)                 NOT NULL
    , tx_division                       VARCHAR(48)                 NOT NULL
    , tx_unit_1                         VARCHAR(48)                 NOT NULL
    , tx_unit_2                         VARCHAR(48)                 NOT NULL

    , CONSTRAINT pk_id_customer_key PRIMARY KEY CLUSTERED(_PRIMARY_KEY)

)

go

_GRANT_PERM_TBL


-- ALTER TABLE T_CUSTOMER ADD tx_district VARCHAR (48) NULL , tx_division VARCHAR (48) NULL
-- ALTER TABLE T_CUSTOMER DROP COLUMN tx_sourcing_brc, tx_staff_id;

 --ALTER TABLE T_CUSTOMER ADD tx_unit_1 VARCHAR (48) NULL , tx_unit_2 VARCHAR (48) NULL
 --ALTER TABLE T_CUSTOMER_AUDIT ADD tx_unit_1 VARCHAR (48) NULL , tx_unit_2 VARCHAR (48) NULL
