
 --ALTER TABLE T_CUSTOMER ADD tx_unit_1 VARCHAR (48) NULL , tx_unit_2 VARCHAR (48) NULL
 --ALTER TABLE T_CUSTOMER_AUDIT ADD tx_unit_1 VARCHAR (48) NULL , tx_unit_2 VARCHAR (48) NULL
 --ALTER TABLE T_LOAN ADD tx_account_no VARCHAR(256) NULL
--ALTER TABLE T_LOAN_AUDIT ADD tx_account_no VARCHAR(256) NULL
UPDATE L
		SET 
		FROM T_LOAN L
		JOIN T_CUSTOMER C ON C.id_customer_key = L.id_customer_key

		UPDATE 
		, L.tx_account_no = C.tx_account_no
		FROM T_LOAN_AUDIT L
		JOIN T_CUSTOMER C ON C.id_customer_key = L.id_customer_key