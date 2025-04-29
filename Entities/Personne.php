<?php

namespace Entities;
use Doctrine\ORM\Mapping as ORM;
#[ORM\Entity]
class Personne
{
    private string $email;
    private string $userName;
    private string $password;
    private bool $isStudent;
    private bool $isTeacher;
    private bool $isAdmin;

}