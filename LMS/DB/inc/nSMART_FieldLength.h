#ifndef NSMART_FIELD_LENGTH_H
#define NSMART_FIELD_LENGTH_H {};


/* General Lengths */
#define _L_NOTES					{_L2048};

/* T_LEGAL_ENTITY */

#define _L_LEGAL_ENTITY_NAME		{_L128};
#define _L_LEGAL_ENTITY_ALIAS		{_L64};


/* T_COMPANY  Lengths */
#define _L_CORP_LEGAL_NAME			{_L256};
#define _L_CORP_SHORT_NAME			{_L256};
#define _L_CORP_NOTES				{_L2048};


/*CONTACT */
#define _L_CORP_POSITION			{_L64};
#define _L_CORP_DEPARTMENT			{_L64};
#define _L_TITLE					{_L8};
#define _L_FIRST_NAME				{_L64};
#define _L_FULL_NAME				{_L128};
#define _L_FAX						{_L64};
#define _L_EMAIL					{_L128};
#define _L_LAST_NAME				{_L64};
#define _L_PERSON_ALIAS				{_L64};
#define _L_CONTACT_NOTES			{_L256};


/* T_PRODUCT*/
#define _L_PRODUCT_NAME				{_L32};
#define _L_PRODUCT_LONG_NAME		{_L64};
#define _L_PRODUCT_TYPE				{_L64};

/* T_VALUABLE Type Attributes*/
#define _L_VALUABLE_NAME			{_L256};
#define _L_VALUABLE_ID				{_L64};
#define _L_VALUABLE_KEY				{_L64};
#define _L_VAL_NOTES				{_L2048};

/*T_VALUABLE_GIC Type Attributes*/
#define _L_ISSUE					{_L128};
#define _L_LEGAL_REFERENCE			{_L2048};

/*T_SWIFT_MODEL_MT Type Attributes*/
#define _L_MT_TYPE					{_L16};
#define _L_MT_NAME					{_L64};
#define _L_MT_DIRECTION				{_L8};

/*T_SWIFT_MODEL_FIELD Type Attributes*/
#define _L_MT_FIELD_TAG				{_L32};
#define _L_MT_FIELD_NAME			{_L64};
#define _L_MT_FIELD_OPTION			{_L32};


/*T_SSI_TEMPLT_MT Type Attributes*/
#define _L_SSI_TMPLT_NAME			{_L64};
#define _L_SSI_NOTES				{_L2048};


/*T_SWIFT_SSI_FIELD Type Attributes*/
#define _L_SSI_MT_FIELD_VALUE		{_L2048};


/*T_GROUP Type Attributes*/
#define _L_GROUP_NAME				{_L64};

/*T_REF_DATA_TYPE Type Attributes*/
#define _L_REF_DATA_TYPE_DESC		{_L64};

/*T_ACTION_TYPE Type Attributes*/
#define _L_ACTION_TYPE_DESC			{_L256};


/*T_BANK_ACCOUNT Type Attributes*/
#define _L_ACCOUNT_CATEGORY			{_L64};
#define _L_ACCOUNT_ALIAS			{_L64};
#define _L_ACCOUNT_NUMBER			{_L64};
#define _L_ACCOUNT_NAME				{_L64};
#define _L_ACCOUNT_TYPE				{_L64};
#define _L_ACCOUNT_CURRENCY			{_L64};


/*T_BANK_ACCOUNT_ACTIVITY Type Attributes*/
#define _L_ACTIVITY_DESC			{_L64};

/*T_EXT_GENERIC_MAP Type Attributes*/
#define _L_SRC_SYS_VALUE			{_L64};

/*T_TYPE_MAP Type attribute*/
#define _L_TYPE_NAME				{_L64};

/* T_PAYMENT_TYPE */
#define _L_PAYMENT_TYPE_NAME		{_L64};
#define _L_JSHEET_PAYMENT_TYPE		{_L64};

/* T_PAS_PAYMENT */
#define _L_PAYING_PARTY				{_L64};
#define _L_RECEIVING_PARTY			{_L64};
#define _L_ACTUAL_PAS_PRODUCT_TYPE	{_L64};
#define _L_PAYMENT_SOURCE_NAME		{_L32};
#define _L_CUSIP					{_L64};
#define _L_UNIQUE_PMT_KEY			{_L128};
#define _L_PAYMENT_FILE_NAME		{_L256};
#define _L_NETTING_RULE				{_L256};
#define _L_RULE_SP_NAME				{_L256};
#define _L_RULE_SP_ARGS				{_L1024};
#define _L_PMT_NOTES				{_L2048};
#define _L_PAYMENT_DIRECTION		{_L32};
#define _L_INTERNAL_REF				{_L128};
#define _L_EXTERNAL_REF				{_L128};
#define _L_PAYMENT_TYPE_DESC		{_L2048};
#define _L_RULE_NAME				{_L1024};
#define _L_PAYMENT_NAME				{_L128};
#define _L_PREVIOUS_FACTOR			{_L16};
#define _L_CURRENT_FACTOR			{_L16};
#define _L_ORIGINAL_FACE			{_L16};
#define _L_BALANCE_TYPE				{_L32};
#define _L_REF_ID					{_L32};
#define _L_RELATED_REF_ID			{_L64};
#define _L_ORDERING_CUST			{_L128};
#define _L_ORDERING_INST_NAME		{_L128};
#define _L_INTERMEDIATE_NAME		{_L128};
#define _L_TXN_MOD					{_L8};
#define _L_ACCOUNT_OWNER_REF		{_L256};
#define _L_TXN_REF_ID				{_L128};
#define _L_BALANCE_TYPE_NAME		{_L128};
#define _L_TXN_TYPE_CODE			{_L128};
#define _L_PAYMENT_OTHER_TYPE		{_L128};
#define _L_PAYMENT_TYPE_DESC		{_L512};
#define _L_PAYMENT_TYPE_NAME		{_L32};
#define _L_USER_NAME				{_L128};
#define _L_MESSAGE_TYPE				{_L32};

/* T_TEMP_SOURCE_PAYMENT */
#define _L_UNIQUE_NETTING_ID		{_L128};
#define _L_UNIQUE_RECORD_ID			{_L512};


/* T_PAYMENT_RECONCILE */
#define _L_PAYMENT_MATCH			{_L128};
#define _L_PAYMENT_UNMATCH			{_L128};
#define _L_PAYMENT_MISSING			{_L128};
#define _L_UNIQ_RECORD_ID			{_L64};


/* Futures files */
#define _L_FUT_BOOK					{_L128};
#define _L_FUT_TICKER				{_L128};

/* T_STAGE_PAYMENT_DTC */
#define _L_PAY_TYPE					{_L128};

/* T_STAGE_PAYMENT_DTC */
#define _L_BOOK						{_L128};

/* ABS_payment.sp */
#define _L_PAYMENT_SUB_TYPE_NAME	{_L64};

/* T_BANK_ACCOUNT_TRANSACTION */
#define _L_SWIFT_TRANS_TYPE			{_L64};
#define _L_TRANS_REF				{_L64};
#define _L_BANK_ACC_REF				{_L64};
#define _L_TRANS_BNY_REF			{_L64};

/* T_BANK_ACCOUNT_BALANCE */
#define _L_DEXIA_REF_KEY			{_L64};
#define _L_NSMART_REF_KEY			{_L64};

#define _L_BALANCE_SOURCE			{_L16};

#define _L_EMAIL_TMPLT_NAME			{_L256};
#define _L_EMAIL_TMPLT_TYPE			{_L128};
#define _L_EMAIL_TMPTL_TO_LIST		{_L2048};
#define _L_EMAIL_TMPLT_CC_LIST		{_L2048};
#define _L_EMAIL_TMPLT_BCC_LIST		{_L2048};
#define _L_EMAIL_TMPLT_SUB			{_L512};
#define _L_EMAIL_INTERVAL_TIME		{_L64};

/* STAGE.T_STAGE_BSA_MAPPING */
#define _L_PAS_VALUABLE				{_L256};
#define _L_PAS_COUNTERPARTY			{_L256};
#define _L_BSA_COUNTERPARTY			{_L256};
#define _L_COUNTRY_CODE				{_L8};

/* T_EMAIL_HISTORY */
#define _L_EMAIL_TYPE				{_L256};
#define _L_EMAIL_TO					{_L256};
#define _L_EMAIL_CC					{_L256};
#define _L_EMAIL_SUB				{_L256};
#define _L_EMAIL_BODY				{_L256};
#define _L_PREF_NAME				{_L128};

#define _L_EMAIL_REF_ID				{_L2048};
#define _L_INTERVAL_RECUR_TYPE		{_L32};

/* T_PROCESSED_BSA_MAP */
#define _L_ERROR_MESSAGE			{_L256};
#define _L_IP_ADDRESS				{_L64};
#define _L_PERMISSION_TYPE			{_L32};

/* T_LEGAL_ENTITY_BIC */

#define _L_BIC_NAME					{_L128};
#define _L_BIC_CODE					{_L64};

#define _L_GENERAL_LEDGER_NAME		{_L256};

/* T_BIC_DETAILS */
#define _L_COUNTRY_NAME 			{_L64};
#define _L_CITY_NAME 				{_L64};

/* T_KEYC_BANK_CUSTOMER */
#define _L_BANK_NAME				{_L512};
#define _L_BRANCH_NAME				{_L512};
#define _L_CUST_ACCT_NO				{_L512};
#define _L_CUST_ACCT_NAME			{_L512};
#define _L_MSG_REF					{_L512};
#define _L_SENDER_NAME				{_L512};
#define _L_RECEIVER_NAME			{_L512};
#define _L_CUST_ACCT_TYPE			{_L128};
#define _L_CUST_ACCT_STATUS			{_L128};
#define _L_OFAC_STATUS 				{_L64};
#define _L_BRANCH_KEY 				{_L128};
#define _L_CUST_ACCT_ID				{_L128};
#define _L_KYC_COMMENT				{MAX};
#define _L_ENTITY_ID 				{MAX};
#define _L_ADDR 					{_L2048};

/*T_SWIFT_MODEL_CATEGORY*/
#define _L_CAT_NAME				    {_L512};
#define _L_CAT_DESC				    {_L512};


/* T_FAQ*//*added by sashe 2/20/2018  (FAQ)*/
#define _L_CATEGORY_NAME			{_L512};
#define _L_QUESTION					{_L2048};
#define _L_ANSWER				    {_L8000};
#define _L_IMAGE_PATH			    {_L512};


/*T_SWIFT_MODEL_CATEGORY*/
#define _L_LAST_POLL_TYPE				{_L128};
#define _L_LAST_POLL_TYPE_VAL			{_L128};
#define _L_SWIFT_FILE_NAME				{_L128};

/* T_SWIFT_ERRO_MSG*/
#define _L_ERROR_CODE 					{_L128};
#define _L_ERROR_NUMBER 				{_L128};
#define _L_ERROR_DESC 					{_L2048};
#define _L_SEARCH_OBJECT 				{_L128};

#define _L_OFAC_BLOCKING_MODE 			{_L64};

#define _L_STATE_NAME 			        {_L64};



/* T_CBS_DATA */

#define _L_STATUS                        {_L64};
#define _L_COMMENTS                      {_L256};
#define _L_NOTES                         {_L256};

#define _L_CUSTOMER_CODE                 {_L32};
#define _L_CUSTOMER_NAME                 {_L128};

#define _L_CUSTOMER_ID                 	 {_L16};
/*#define _L_SANCTION_NUMBER               {_L16};*/
#define _L_BENEFICIARY_CODE              {_L16};
#define _L_BENEFICIARY_NAME              {_L32};
#define _L_CURRENT_ACCOUNT_NO            {_L16};

/*#define _L_LINKED_ACCOUNT_NUMBER         {_L16};*/
#define _L_LC_NUMBER                     {_L32};
#define _L_LC_TYPE                       {_L8};


#define _L_LIMIT_ID                      {_L16};
#define _L_BOOKING                    	 {_L64};
#define _L_LTR_PAD                     	 {_L64};
#define _L_RECOURSE_ALLOWED              {_L8};
#define _L_CATEGORY_CODE                 {_L8};
#define _L_COMM_MEDIA                    {_L8};

#define _L_IMP_NUMBER                    {_L32};
#define _L_RATE_CODE                     {_L8};
#define _L_SANCTION_AUTHORITY            {_L8};
#define _L_SANCTION_NO                   {_L32};

#define _L_CHARGE_PAID_BY                {_L8};
#define _L_AMENDMENT_NO                  {_L8};
#define _L_INDENT_FLAG                   {_L8};
#define _L_B_BANK_PERMISSION_NO          {_L128};

#define _L_PSI_CRF_AND_INS               {_L128};
#define _L_DOC_REQ                       {_L4096};
#define _L_CONDITIONS                    {_L4096};
#define _L_VAT_REG_NO                    {_L128};

#define _L_TIN_NO                        {_L128};
#define _L_LCAF_NO                       {_L64};
#define _L_TRADE_TERM                    {_L16};
#define _L_DC_NO                         {_L16};


#define _L_HS_CODE                       {_L256};
#define _L_STATUS_OF_CREDIT              {_L8};
#define _L_BRANCH_CODE                   {_L8};
#define _L_AC_TYPE                  	 {_L32};
#define _L_AC_NUMBER                	 {_L64};

#define _L_ACCOUNT_TITLE                 {_L64};
#define _L_TYPE_OF_LC              	     {_L8};
#define _L_FOREIGN_LC                    {_L8};
#define _L_NEGOTIATION                   {_L32};

#define _L_FORM_OF_LC                    {_L8};
#define _L_PLACE_OF_EXP              	 {_L64};
#define _L_ORIGIN                        {_L8};
#define _L_AVAILABLE_BY                  {_L8};

#define _L_THROUGH_LAND_PORT             {_L8};
#define _L_FROM_PORT              		 {_L64};
#define _L_TRANSPORT_TO                  {_L64};
#define _L_CURRENCY                  	 {_L8};

#define _L_ADVISING_BANK               	 {_L64};
#define _L_CONFIRMING_BANK               {_L8};
#define _L_INSURANCE_CODE                {_L8};
#define _L_INS_COVER_NOTE_NO             {_L32};
#define _L_MADE_OF_TRANSPORT             {_L8};

#define _L_STATUS_OF_TRAN_DOC            {_L8};
#define _L_OVERSEAS_BANK_CHRG_PAID_BY    {_L8};
#define _L_INDENT_PROFORMA_FLAG          {_L8};
#define _L_PROFORMA_INV_NO               {_L128};

#define _L_INDENTOR_NAME_AND_ADD         {_L512};
#define _L_GOODS_DETAILS                 {_L1024};
#define _L_AVAILABLE_WITH          		 {_L8};
#define _L_CONFIRM_INSTR               	 {_L8};

#define _L_TRANSFERABLE                  {_L8};
#define _L_TRANS_SHIPMENT_ALLOWED        {_L8};
#define _L_PART_SHIPMENT_ALLOWED         {_L8};

#define _L_CUSTOMER_ADDRESS1             {_L128};
#define _L_CUSTOMER_ADDRESS2             {_L64};
#define _L_BENEFICIARY_ADDRESS1          {_L64};
#define _L_BENEFICIARY_ADDRESS2          {_L64};
#define _L_BENEFICIARY_ADDRESS3          {_L64};

#define _L_HS_CODE_UNIT_CODE          	 {_L16};
#define _L_EDF_LC                        {_L8};

#define _L_RES_BRANCH             		{_L64};
#define _L_LC_FINANCE             		{_L64};
#define _L_SHIPMENT_PERIOD          	{_L64};
#define _L_ADVICE_THRO_BANK          	{_L64};
#define _L_NEGOTIATING_BANK          	{_L64};

#define _L_TRANSFERRING_BANK            {_L64};
#define _L_REIMBURSING_BANK             {_L64};
#define _L_APPLICANT_BANK          		{_L64};
#define _L_PERIOD_PRESENT          		{_L64};

#define _L_INSTRUCTIONS            		{_L256};
#define _L_ADDITIONAL_CONDITION         {_L4096};
#define _L_SERIAL_NO          			{_L64};
#define _L_IRC_NO          				{_L64};

#define _L_GUARANTEE_NO             	{_L64};
#define _L_TENDER_NO             		{_L64};
#define _L_CONTACT_NO          			{_L32};
#define _L_BANK_REG_NO          		{_L64};
#define _L_SEQ_TOTAL          			{_L64};

#define _L_DRAWEE             			{_L64};
#define _L_USANCE             			{_L32};
#define _L_LC_STATUS          			{_L32};
#define _L_CCI_REG_NO          			{_L64};
#define _L_CHARGES          			{_L512};

#define _L_SEND_TO_RECR            		{_L64};

#define _L_RES_BRANCH_ADD             	{_L256};
#define _L_LC_TYPE_DESC             	{_L256};
#define _L_ADVISING_BANK_BRANCH         {_L256};
#define _L_ADVICE_THRO_BANK_BRANCH      {_L256};
#define _L_NEGOTIATING_BANK_BRANCH      {_L256};

#define _L_TRANSFERRING_BANK_BRANCH     {_L256};
#define _L_REIMBURSING_BANK_BRANCH      {_L256};
#define _L_CONFIRMING_BANK_BRANCH       {_L256};
#define _L_APPLICANT_BANK_BRANCH        {_L256};
#define _L_MADE_TRANSPORT      			{_L256};

#define _L_RATE             	        {_L256};
#define _L_TRADE             			{_L256};
#define _L_AVAILABLE_BY_ADD         	{_L256};
#define _L_FROM_PORT_NAME      			{_L256};
#define _L_TRANSPORT_TO_NAME      		{_L256};

#define _L_ADVISING_BANK_BRANCH_CODE         {_L256};
#define _L_ADVICE_THRO_BANK_BRANCH_CODE      {_L256};
#define _L_NEGOTIATING_BANK_BRANCH_CODE      {_L256};

#define _L_TRANSFERRING_BANK_BRANCH_CODE     {_L256};
#define _L_REIMBURSING_BANK_BRANCH_CODE      {_L256};
#define _L_CONFIRMING_BANK_BRANCH_CODE       {_L256};
#define _L_APPLICANT_BANK_BRANCH_CODE        {_L256};

#define _L_DC_NO_ADD      				 	 {_L256};

#define _L_INSURANCE_BRN_CODE      		   	 {_L128};
#define _L_INSURANCE_CO_NAME      			 {_L256};
#define _L_AVAILABLE_WITH_DESC      		 {_L256};

/* T_HS_CODE */

#define _L_ACT_NUM                  	{_L32};
#define _L_BRANCH_CODE        			{_L32};
#define _L_ACT_TYPE         			{_L32};

#define _L_HS_CODE                  	{_L32};
#define _L_HS_CODE_DES        			{_L128};
#define _L_OPR_STAMP         			{_L64};

#define _L_UNT_CDE                  	{_L32};
#define _L_COUNT_CD        				{_L32};
#define _L_UNT_PRC         				{_L64};

#define _L_QUANTITY                  	{_L32};
#define _L_OPR_TYPE        				{_L32};
#define _L_QUN_STS         				{_L32};


/*T_MT_MAIL_CONFIG*/
#define _L_CUST_NAME                	{_L512};
#define _L_CUST_IDF                		{_L32};
#define _L_EMAIL                		{_L128};
#define _L_IN_FIELD                		{_L32};
#define _L_OUT_FIELD                	{_L32};
#define _L_BEN_NAME                		{_L512};

/*T_SMTP_CONFIG*/
#define _L_SMTP_SERVER                	{_L256};
#define _L_SSL_TLS_NONE                	{_L64};
#define _L_AUTH_USERNAME                {_L256};
#define _L_AUTH_PASSWORD                {_L128};
#define _L_DEFAULT_EMAIL_SUBJECT        {_L128};
#define _L_DISCLAIMER        			{_L4096};



#define _L_CBS_BRNC_CODE        			{_L32};


/*T_CUST_INTER_CHANGE_LIMIT*/
#define _L_AMOUNT        			{_L64};
#define _L_TX_DATE       			{_L64};
#define _L_LTR_SEPARATED       		{_L64};
#define _L_CHAR_MARK       			{_L8};
#define _L_MARGIN      				{_L128};


/*T_CUST_MAIL_LOG*/
#define _L_MT_TYPE                		{_L32};
#define _L_SEARCH_NAME                	{_L128};
#define _L_EMAIL_ADDR                	{_L256};
#define _L_MAIL_TYPE                	{_L64};
#define _L_SEARCH_QUERY        			{_L4096};
#define _L_ERROR        				{_L4096};


/*T_NOSTRO_CONFIG*/
#define _L_GROUP              		{_L64};
#define _L_SUB_GROUP                {_L64};
#define _L_NAME                		{_L64};
#define _L_VALUE1                	{_L512};
#define _L_VALUE2                	{_L512};
#define _L_VALUE3                	{_L512};


#endif