USE bd_atelie;
GO

-- Verificar se a coluna orcamento existe, se não existir, adicionar
IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('Agendamento') AND name = 'orcamento')
BEGIN
    ALTER TABLE Agendamento ADD orcamento DECIMAL(10,2);
END
GO