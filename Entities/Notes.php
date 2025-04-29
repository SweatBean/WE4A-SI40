<?php

namespace Entities;
use Doctrine\ORM\Mapping as ORM;
#[ORM\Entity]
class Notes
{
    private string $userName;
    private int $controlID;
    private float $note;
}