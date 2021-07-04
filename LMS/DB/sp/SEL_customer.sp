/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Kh. Assaduzzaman Sohan
* Date          : 24 DEC 2019
* Description   : Sp to SELECT information from T_CUSTOMER Table
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _SP_NAME        {SEL_customer};
#define _TABLE_NAME     {T_CUSTOMER};
#define _PRIMARY_KEY    {id_customer_key};
#define _VERSION        {id_customer_ver};

_DROP_PROC

_CREATE_PROC (_SP_NAME)
    
    _SP_PARAM_HEADER

	, @_PRIMARY_KEY					     INT				= NULL		
	, @_VERSION						     INT				= NULL		

	, @tx_customer_id                    VARCHAR(256)           = NULL      

    , @tx_bp_no                          VARCHAR(256)           = NULL      
    , @tx_customer_name                  VARCHAR(256)           = NULL
    , @tx_designation                    VARCHAR(256)           = NULL
    , @tx_current_posting_place          VARCHAR(256)           = NULL
    , @dtt_date_of_birth                 DATETIME               = NULL
    , @tx_age                            VARCHAR(256)           = NULL
    , @dtt_joining_date                  DATETIME               = NULL
    , @tx_service_length                 VARCHAR(256)           = NULL
    , @dtt_retirement_date               DATETIME               = NULL
    , @tx_remaining_year_of_retirement   VARCHAR(256)           = NULL
   
    , @tx_nid                            VARCHAR(256)           = NULL
    , @tx_tin                            VARCHAR(256)           = NULL
    , @tx_account_no                     VARCHAR(256)           = NULL
    , @int_salary_disbursed_with_cbbl    INT                    = NULL
    , @tx_marital_status                 VARCHAR(256)           = NULL
    , @tx_cif                            VARCHAR(256)           = NULL
    , @tx_mother_name                    VARCHAR(256)           = NULL
    , @tx_father_name                    VARCHAR(256)           = NULL
    , @tx_spouse                         VARCHAR(256)           = NULL
    , @tx_house_ownership                VARCHAR(256)           = NULL
    , @tx_permanet_addr                  VARCHAR(256)           = NULL
    , @tx_office_addr                    VARCHAR(256)           = NULL
    , @tx_mobile                         VARCHAR(256)           = NULL
    , @tx_emer_phone                     VARCHAR(256)           = NULL
    , @tx_is_matched_nid                 VARCHAR(256)           = NULL
    , @id_customer_type_key              INT                    = NULL
    , @tx_name_in_bangla                 NVARCHAR(256)          = NULL
    , @tx_alternative_mobile             VARCHAR(16)            = NULL
    , @tx_office_id                     VARCHAR(256)           = NULL
    , @tx_unit_1                        VARCHAR(48)            = NULL
    , @tx_unit_2                        VARCHAR(48)            = NULL

	_SP_PARAM_FOOTER

AS

{
	_SP_SEL_HEADER

         SELECT  tx_rs_type = 'RS_TYPE_CUSTOMER'
         , C.*
         FROM  _TABLE_NAME C
         WHERE 	id_customer_key   = ISNULL(@id_customer_key  ,id_customer_key)
         AND 	tx_customer_id    = ISNULL(@tx_customer_id   ,tx_customer_id)
         AND    tx_nid            = ISNULL(@tx_nid           ,tx_nid)
         AND    tx_bp_no          = ISNULL(@tx_bp_no         ,tx_bp_no)
         AND    tx_account_no     = ISNULL(@tx_account_no         ,tx_account_no)
         AND    is_active = 1

	_SP_FOOTER
}
go

_GRANT_PERM_SP