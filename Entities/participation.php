<?php

namespace Entities;
use Doctrine\ORM\Mapping as ORM;
#[ORM\Entity]
class participation
{
    private int $courID;
    private string $userName;
}