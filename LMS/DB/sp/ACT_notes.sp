/* __VER_INFO__  :  */
/******************************************************************************
* Author		: Mirajul Islam
* Date			: 2021-05-26
* Description	: 
******************************************************************************/

#include <nSMART_SQL.h>

#define _SP_NAME 			{ACT_notes};
#define _TABLE_NAME 		{T_NOTES};
#define _PRIMARY_KEY		{id_notes_key};
#define _VERSION			{id_notes_ver};

_DROP_PROC

_CREATE_PROC (_SP_NAME)

	_SP_PARAM_HEADER

	  , @_PRIMARY_KEY					int								= NULL		OUTPUT
	  , @_VERSION						int								= NULL		OUTPUT
	  , @id_ref_key				    	int								= NULL	
	  , @tx_notes_by				    varchar(128)					= NULL
	  , @tx_loan_notes        			    varchar(MAX)					= NULL
	  , @id_creator_key				    int								= NULL	
	  , @dtt_create      				DATETIME						= NULL

	_SP_PARAM_FOOTER

	AS
{

	_SP_HEADER

	IF ( @tx_action_name = 'NEW' )
	{
		_INIT_VERSION(@_VERSION)

		INSERT INTO _TABLE_NAME
	    (
		    _VERSION
		    ,_TABLE_HEADER_INS_FIELD_WITH_STATE
		          
		    , id_ref_key	                 
		    , tx_notes_by	                 
		    , tx_loan_notes		               
		    , id_creator_key 
			, dtt_create  
	    )
	    VALUES
	    (  
		    @_VERSION
		    ,_TABLE_HEADER_INS_VAL_WITH_STATE

		    , ISNULL(@id_ref_key		             , _DB_NULL_INT)
		    , ISNULL(@tx_notes_by		             , _DB_NULL_STR)
		    , ISNULL(@tx_loan_notes		                 , _DB_NULL_STR)
		    , ISNULL(@id_creator_key		         , _DB_NULL_INT)
		    , ISNULL(@dtt_create                   , GETDATE())
	    )

	    SELECT @_PRIMARY_KEY = IDENT_CURRENT('T_NOTES')
	}
	IF(@tx_action_name = 'SELECT')
	{
		select tx_rs_type = 'RS_TYPE_NOTES' 
		, TN.id_notes_key
		, TN.id_notes_ver
		, TN.id_ref_key
		, TN.tx_loan_notes
		, TN.tx_notes_by
		, TN.dtt_create
		, TN.id_creator_key
		, TN.id_user_mod_key
		FROM T_NOTES TN
		where TN.id_ref_key = @id_ref_key
	}
	
	_SP_FOOTER
}
go


_GRANT_PERM_SP