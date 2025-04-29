<?php

namespace Entities;
use Doctrine\ORM\Mapping as ORM;
#[ORM\Entity]
class Cour
{
    private int $courID;
    private string $name;
    private string $description;
    private string $image;
}