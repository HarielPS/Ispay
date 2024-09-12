// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CorporateWallet {
    address public admin;
    address public employee;
    mapping(string => bool) public validCategories; // Mapping para verificar rápidamente categorías válidas

    // Eventos para registrar transferencias y depósitos
    event Deposit(address indexed from, uint256 amount);
    event Transfer(address indexed to, uint256 amount, string[] categories);

    // Modificador para restringir el acceso al admin
    modifier onlyAdmin() {
        require(msg.sender == admin, "Solo el admin puede ejecutar esta funcion.");
        _;
    }

    // Modificador para restringir el acceso al empleado
    modifier onlyEmployee() {
        require(msg.sender == employee, "Solo el empleado puede ejecutar esta funcion.");
        _;
    }

    // Modificador para verificar que las categorías sean válidas
    modifier validCategoriesCheck(string[] memory _categories) {
        require(_categories.length > 0, "Se debe ingresar al menos una categoria.");
        for (uint256 i = 0; i < _categories.length; i++) {
            require(validCategories[_categories[i]], "Categoria no valida.");
        }
        _;
    }

    // Constructor para inicializar el contrato con las direcciones y categorías
    constructor(address _admin, address _employee, string[] memory _categories) {
        admin = _admin;
        employee = _employee;

        // Inicializamos las categorías válidas en el mapping
        for (uint256 i = 0; i < _categories.length; i++) {
            validCategories[_categories[i]] = true;
        }
    }

    // Función para recibir depósitos solo desde el admin
    function deposit() external payable onlyAdmin {
        require(msg.value > 0, "El deposito debe ser mayor a cero.");
        emit Deposit(msg.sender, msg.value);
    }

    // Función para transferir fondos desde el empleado, comprobando las categorías
    function transferFunds(address payable _to, uint256 _amount, string[] memory _categories)
        external
        onlyEmployee
        validCategoriesCheck(_categories)
    {
        require(address(this).balance >= _amount, "Saldo insuficiente.");
        _to.transfer(_amount);
        emit Transfer(_to, _amount, _categories);
    }

    // Función para consultar el saldo del contrato
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}