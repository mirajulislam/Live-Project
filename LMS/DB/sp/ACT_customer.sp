/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Kh. Assaduzzaman Sohan
* Date          : 24 DEC 2019
* Description   : 
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _SP_NAME        {ACT_customer};
#define _TABLE_NAME     {T_CUSTOMER};
#define _PRIMARY_KEY    {id_customer_key};
#define _VERSION        {id_customer_ver};


_DROP_PROC

_CREATE_PROC (_SP_NAME)
    
    _SP_PARAM_HEADER

	, @_PRIMARY_KEY					     INT					= NULL		OUTPUT
	, @_VERSION						     INT					= NULL	     OUTPUT

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
    , @tx_mobile                        VARCHAR(256)           = NULL
    , @tx_emer_phone                    VARCHAR(256)           = NULL
    , @tx_is_matched_nid                VARCHAR(256)           = NULL

    , @tx_customer_type                 VARCHAR(256)           = NULL
    , @id_customer_type_key             INT                    = NULL
    , @tx_name_in_bangla                NVARCHAR(256)          = NULL
    , @tx_alternative_mobile            VARCHAR(16)           = NULL
    , @tx_office_id                     VARCHAR(256)           = NULL
    , @tx_district                      VARCHAR(48)            = NULL 
    , @tx_division                      VARCHAR(48)            = NULL
    , @tx_unit_1                        VARCHAR(48)            = NULL
    , @tx_unit_2                        VARCHAR(48)            = NULL
    , @tx_search_Date_Of_Birth             VARCHAR(48)            = NULL

    _SP_PARAM_FOOTER

AS

{
	_SP_HEADER

    IF ( @tx_action_name IN('NEW', 'UPDATE'))
    {
        IF ( (@dtt_date_of_birth IS NOT NULL) AND (@tx_age IS NULL) )
        {
            select @tx_age = dbo.calculateDateDiff(@dtt_date_of_birth, GETDATE()) 
        }
        IF ( (@dtt_joining_date IS NOT NULL) AND (@tx_service_length IS NULL) )
        {
            select @tx_service_length = dbo.calculateDateDiff(@dtt_joining_date, GETDATE())
        }
        IF ( (@dtt_retirement_date IS NOT NULL) AND (@tx_remaining_year_of_retirement IS NULL) )
        {
            select @tx_remaining_year_of_retirement = dbo.calculateDateDiff(@dtt_retirement_date, GETDATE())
        }
    }
    
    
    IF ( @tx_action_name = 'SELECT_USER' )
    {
        SELECT tx_rs_type = 'RS_TYPE_USER'
                 , U.*  
        FROM T_USER U
        WHERE id_user_mod_key = @id_user_mod_key
    }

  IF ( @tx_action_name = _ACTION_NEW )
  {

    DECLARE @l_id_customer_key INT = 
    (
        SELECT TOP(1) id_customer_key 
        FROM T_CUSTOMER 
        WHERE tx_customer_id = @tx_customer_id
        AND is_active = 1
        ORDER BY dtt_mod DESC
    )

    IF(@l_id_customer_key IS NOT NULL)
    {
        _SET_ACTION(_ACTION_UPDATE)

       SELECT @id_customer_key = @l_id_customer_key
    }
    ELSE
    {

        EXEC @g_id_return_status = INS_customer

        _SP_ARGS_HEADER
        , @_PRIMARY_KEY                         =  @_PRIMARY_KEY        OUTPUT
        , @_VERSION                             =  @_VERSION            OUTPUT

        , @tx_customer_id                       = @tx_customer_id       

        , @tx_bp_no                             = @tx_bp_no
        , @tx_customer_name                     = @tx_customer_name
        , @tx_designation                       = @tx_designation
        , @tx_current_posting_place             = @tx_current_posting_place
        , @dtt_date_of_birth                    = @dtt_date_of_birth
        , @tx_age                               = @tx_age
        , @dtt_joining_date                     = @dtt_joining_date
        , @tx_service_length                    = @tx_service_length
        , @dtt_retirement_date                  = @dtt_retirement_date
        , @tx_remaining_year_of_retirement      = @tx_remaining_year_of_retirement

        , @tx_nid                               = @tx_nid
        , @tx_tin                               = @tx_tin
        , @tx_account_no                        = @tx_account_no
        , @int_salary_disbursed_with_cbbl       = @int_salary_disbursed_with_cbbl
        , @tx_marital_status                    = @tx_marital_status
        , @tx_cif                               = @tx_cif
        , @tx_mother_name                       = @tx_mother_name
        , @tx_father_name                       = @tx_father_name
        , @tx_spouse                            = @tx_spouse
        , @tx_house_ownership                   = @tx_house_ownership
        , @tx_permanet_addr                     = @tx_permanet_addr  
        , @tx_office_addr                       = @tx_office_addr
        , @tx_mobile                            = @tx_mobile
        , @tx_emer_phone                        = @tx_emer_phone
        , @tx_is_matched_nid                    = @tx_is_matched_nid
        , @id_customer_type_key                 = @id_customer_type_key
        , @tx_name_in_bangla                    = @tx_name_in_bangla
        , @tx_alternative_mobile                = @tx_alternative_mobile
        , @tx_office_id                         = @tx_office_id
        , @tx_district                          = @tx_district
        , @tx_division                          = @tx_division
        , @tx_unit_1                            = @tx_unit_1   
        , @tx_unit_2                            = @tx_unit_2    
    }  

    _RETURN_IF_SP_ERROR(INS_customer)
  }
  IF ( @tx_action_name = _ACTION_SELECT )
  {
    EXEC @g_id_return_status = SEL_customer
    
     _SP_ARGS_HEADER
    , @_PRIMARY_KEY                         =  @_PRIMARY_KEY       
    , @_VERSION                             =  @_VERSION        

    , @tx_customer_id                       = @tx_customer_id

    , @tx_bp_no                             = @tx_bp_no
    , @tx_customer_name                     = @tx_customer_name
    , @tx_designation                       = @tx_designation
    , @tx_current_posting_place             = @tx_current_posting_place
    , @dtt_date_of_birth                    = @dtt_date_of_birth
    , @tx_age                               = @tx_age
    , @dtt_joining_date                     = @dtt_joining_date
    , @tx_service_length                    = @tx_service_length
    , @dtt_retirement_date                  = @dtt_retirement_date
    , @tx_remaining_year_of_retirement      = @tx_remaining_year_of_retirement

    , @tx_nid                               = @tx_nid
    , @tx_tin                               = @tx_tin
    , @tx_account_no                        = @tx_account_no
    , @int_salary_disbursed_with_cbbl       = @int_salary_disbursed_with_cbbl
    , @tx_marital_status                    = @tx_marital_status
    , @tx_cif                               = @tx_cif
    , @tx_mother_name                       = @tx_mother_name
    , @tx_father_name                       = @tx_father_name
    , @tx_spouse                            = @tx_spouse
    , @tx_house_ownership                   = @tx_house_ownership
    , @tx_permanet_addr                     = @tx_permanet_addr  
    , @tx_office_addr                       = @tx_office_addr
    , @tx_mobile                            = @tx_mobile
    , @tx_emer_phone                        = @tx_emer_phone
    , @tx_is_matched_nid                    = @tx_is_matched_nid
    , @id_customer_type_key                 = @id_customer_type_key
    , @tx_name_in_bangla                    = @tx_name_in_bangla
    , @tx_alternative_mobile                = @tx_alternative_mobile
    , @tx_office_id                         = @tx_office_id
    , @tx_unit_1                            = @tx_unit_1   
    , @tx_unit_2                            = @tx_unit_2
    _RETURN_IF_SP_ERROR(SEL_customer)
  }

  IF (@tx_action_name = _ACTION_DELETE)
  { 
    _SET_ACTION(_ACTION_UPDATE)
    , @is_active = 0
  }

  IF( @tx_action_name = _ACTION_UPDATE )
  {
    EXEC @g_id_return_status = UPD_customer

     _SP_ARGS_HEADER
    , @_PRIMARY_KEY                         =  @_PRIMARY_KEY        OUTPUT 
    , @_VERSION                             =  @_VERSION            OUTPUT    
    
    , @tx_customer_id                       = @tx_customer_id       

    , @tx_bp_no                             = @tx_bp_no
    , @tx_customer_name                     = @tx_customer_name
    , @tx_designation                       = @tx_designation
    , @tx_current_posting_place             = @tx_current_posting_place
    , @dtt_date_of_birth                    = @dtt_date_of_birth
    , @tx_age                               = @tx_age
    , @dtt_joining_date                     = @dtt_joining_date
    , @tx_service_length                    = @tx_service_length
    , @dtt_retirement_date                  = @dtt_retirement_date
    , @tx_remaining_year_of_retirement      = @tx_remaining_year_of_retirement

    , @tx_nid                               = @tx_nid
    , @tx_tin                               = @tx_tin
    , @tx_account_no                        = @tx_account_no
    , @int_salary_disbursed_with_cbbl       = @int_salary_disbursed_with_cbbl
    , @tx_marital_status                    = @tx_marital_status
    , @tx_cif                               = @tx_cif
    , @tx_mother_name                       = @tx_mother_name
    , @tx_father_name                       = @tx_father_name
    , @tx_spouse                            = @tx_spouse
    , @tx_house_ownership                   = @tx_house_ownership
    , @tx_permanet_addr                     = @tx_permanet_addr  
    , @tx_office_addr                       = @tx_office_addr
    , @tx_mobile                            = @tx_mobile
    , @tx_emer_phone                        = @tx_emer_phone
    , @tx_is_matched_nid                    = @tx_is_matched_nid
    , @id_customer_type_key                 = @id_customer_type_key
    , @tx_name_in_bangla                    = @tx_name_in_bangla
    , @tx_alternative_mobile                = @tx_alternative_mobile
    , @tx_office_id                         = @tx_office_id
    , @tx_district                          = @tx_district
    , @tx_division                          = @tx_division
    , @tx_unit_1                            = @tx_unit_1   
    , @tx_unit_2                            = @tx_unit_2
    _RETURN_IF_SP_ERROR(UPD_customer) 
  }

 IF( @tx_action_name = 'SEARCH_NID_DETAILS_FOR_COMPARE' )
  {
    SELECT  tx_rs_type = 'RS_TYPE_CUSTOMER_NID_DETAILS' , C.* from T_CUSTOMER C where 
    CAST(C.dtt_date_of_birth AS DATE) <= ISNULL(CAST(@tx_search_Date_Of_Birth AS DATE)  ,C.dtt_date_of_birth)
    AND C.tx_nid          = ISNULL(@tx_nid        ,C.tx_nid)
    AND C.is_active=1
  }
	_SP_FOOTER
}
go

_GRANT_PERM_SP