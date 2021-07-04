#include <nSMART_SQL.h>

#define _SP_NAME			{UPD_configuration};
#define _TABLE_NAME			{T_CONFIGURATION};
#define _PRIMARY_KEY		{id_configuration_key};
#define _VERSION			{id_configuration_ver};

_DROP_PROC

_CREATE_PROC (_SP_NAME)
		
	_SP_PARAM_HEADER
		
	, @_PRIMARY_KEY					int								= NULL		OUTPUT
	, @_VERSION						int								= NULL		OUTPUT

	, @tx_group						varchar(256)					= NULL		
	, @tx_sub_group					varchar(256)					= NULL		
	, @tx_name						varchar(256)					= NULL		
	, @tx_value1					varchar(256)					= NULL		
	, @tx_value2					varchar(256)					= NULL		
	, @tx_value3					varchar(256)					= NULL		
	, @tx_desc						varchar(256)					= NULL		
	, @tx_comment					varchar(256)					= NULL
	, @tx_value_type				varchar(256)					= NULL	
	, @int_include_authorized		int 							= 0
	, @tx_block_nostro				int								= 0	
	, @int_read_only				int 							= NULL
						 
	_SP_PARAM_FOOTER

AS

{
	_SP_HEADER


		UPDATE	_TABLE_NAME
		SET		_TABLE_HEADER_UPD_WITH_STATE
					
				, tx_group				= ISNULL(@tx_group			, tx_group)			
				, tx_sub_group			= ISNULL(@tx_sub_group		, tx_sub_group)			
				, tx_name				= ISNULL(@tx_name			, tx_name)			
				, tx_value1				= ISNULL(@tx_value1			, tx_value1)			
				, tx_value2				= ISNULL(@tx_value2			, tx_value2)			
				, tx_value3				= ISNULL(@tx_value3			, tx_value3)			
				, tx_desc				= ISNULL(@tx_desc			, tx_desc)			
				, tx_comment			= ISNULL(@tx_comment		, tx_comment)
				
				, tx_value_type			= ISNULL(@tx_value_type		, tx_value_type)

				
		WHERE	id_configuration_key = @id_configuration_key
		AND     tx_group = @tx_group
		AND		tx_sub_group = @tx_sub_group
		AND	    is_active = 1

		_STORE_SYS_VARS		
		SELECT @g_tx_err_msg = _GEM_UPDATE(_TABLE_NAME, @id_configuration_key)
		_HANDLE_ZERO_ROW_COUNT(_GEC_UPDATE, @g_tx_err_msg)

		_UPDATE_VER(@id_configuration_key)

		_TOUCHED_TABLE(_TABLE_NAME)

	

	_SP_FOOTER

	RETURN _STATUS_OK
}
go

_GRANT_PERM_SP