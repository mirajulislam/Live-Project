/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Kh. Assaduzzaman Sohan
* Date          : 24 DEC 2019
* Description   : Sp to UPDATE information in T_CUSTOMER Table
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _SP_NAME        {UPD_customer};
#define _TABLE_NAME     {T_CUSTOMER};
#define _PRIMARY_KEY    {id_customer_key};
#define _VERSION        {id_customer_ver};

_DROP_PROC

_CREATE_PROC (_SP_NAME)

	_SP_PARAM_HEADER

  , @_PRIMARY_KEY                 int                 = NULL   OUTPUT 
  , @_VERSION                     int                 = NULL    OUTPUT    

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
  , @id_customer_type_key             INT                    = NULL
  , @tx_name_in_bangla                NVARCHAR(256)          = NULL
  , @tx_alternative_mobile            VARCHAR(16)           = NULL
  , @tx_office_id                     VARCHAR(256)           = NULL
  , @tx_district                      VARCHAR(48)            = NULL 
  , @tx_division                      VARCHAR(48)            = NULL
  , @tx_unit_1                        VARCHAR(48)            = NULL
  , @tx_unit_2                        VARCHAR(48)            = NULL

  _SP_PARAM_FOOTER

AS

{
	_SP_HEADER

    SELECT @id_customer_ver = (SELECT id_customer_ver FROM T_CUSTOMER WHERE id_customer_key = @id_customer_key) + 1

  UPDATE _TABLE_NAME
  SET _TABLE_HEADER_UPD_WITH_STATE
  , id_customer_ver                  = @id_customer_ver
  , tx_customer_id                   = ISNULL(@tx_customer_id                   ,tx_customer_id)
  , id_customer_type_key             = ISNULL(@id_customer_type_key             ,id_customer_type_key)
  , tx_bp_no                         = ISNULL(@tx_bp_no                         ,tx_bp_no)
  , tx_customer_name                 = ISNULL(@tx_customer_name                 ,tx_customer_name)
  , tx_designation                   = ISNULL(@tx_designation                   ,tx_designation)
  , tx_current_posting_place         = ISNULL(@tx_current_posting_place         ,tx_current_posting_place)
  , dtt_date_of_birth                = ISNULL(@dtt_date_of_birth                ,dtt_date_of_birth)
  , tx_age                           = ISNULL(@tx_age                           ,tx_age)
  , dtt_joining_date                 = ISNULL(@dtt_joining_date                 ,dtt_joining_date)
  , tx_service_length                = ISNULL(@tx_service_length                ,tx_service_length)
  , dtt_retirement_date              = ISNULL(@dtt_retirement_date              ,dtt_retirement_date)
  , tx_remaining_year_of_retirement  = ISNULL(@tx_remaining_year_of_retirement  ,tx_remaining_year_of_retirement)
  , tx_nid                           = ISNULL(@tx_nid                           ,tx_nid)
  , tx_tin                           = ISNULL(@tx_tin                           ,tx_tin)
  , tx_account_no                    = ISNULL(@tx_account_no                    ,tx_account_no)
  , int_salary_disbursed_with_cbbl   = ISNULL(@int_salary_disbursed_with_cbbl   ,int_salary_disbursed_with_cbbl)
  , tx_marital_status                = ISNULL(@tx_marital_status                ,tx_marital_status)
  , tx_cif                           = ISNULL(@tx_cif                           ,tx_cif)
  , tx_mother_name                   = ISNULL(@tx_mother_name                   ,tx_mother_name)
  , tx_father_name                   = ISNULL(@tx_father_name                   ,tx_father_name)
  , tx_spouse                        = ISNULL(@tx_spouse                        ,tx_spouse)
  , tx_house_ownership               = ISNULL(@tx_house_ownership               ,tx_house_ownership)
  , tx_permanet_addr                 = ISNULL(@tx_permanet_addr                 ,tx_permanet_addr)
  , tx_office_addr                   = ISNULL(@tx_office_addr                   ,tx_office_addr)
  , tx_mobile                        = ISNULL(@tx_mobile                        ,tx_mobile)
  , tx_emer_phone                    = ISNULL(@tx_emer_phone                    ,tx_emer_phone)
  , tx_is_matched_nid                = ISNULL(@tx_is_matched_nid                ,tx_is_matched_nid)
  , tx_name_in_bangla                = ISNULL(@tx_name_in_bangla                ,tx_name_in_bangla)
  , tx_alternative_mobile            = ISNULL(@tx_alternative_mobile            ,tx_alternative_mobile)
  , tx_office_id                     = ISNULL(@tx_office_id                ,tx_office_id)
  , tx_district                      = ISNULL(@tx_district                ,tx_district)
  , tx_division                      = ISNULL(@tx_division                ,tx_division)
  , tx_unit_1                        = ISNULL(@tx_unit_1                ,tx_unit_1)
  , tx_unit_2                        = ISNULL(@tx_unit_2                ,tx_unit_2)
      
  WHERE  id_customer_key   = @id_customer_key
  AND    is_active = 1

	_TOUCHED_TABLE(_TABLE_NAME)

	_SP_FOOTER

	RETURN _STATUS_OK
}
go

_GRANT_PERM_SP